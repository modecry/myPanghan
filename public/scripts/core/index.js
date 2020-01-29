/**
 *  Основной класс релизующий общую логику и управляющий  отдельными частями модуля
 */
class StructuredContent {
    constructor(contentConfig, selector) {
        this.contentConfig = contentConfig; // основная конфигурация
        this.contentState = {
            filters: {
                search: "",
                category: ""
            },
            data: []
        } // базовый стейт
        this.root = document.querySelector(selector); // root  компонент в который будет рендерится контент
    }

    /**
     * Метод установки фильтров и поиска
     * @param category - требуемая категория
     * @param search - строка с поиском
     */
    setFilters = (category, search) => {
        // устанавливаем фильтры
        this.contentState.filters = {search, category};
        this.blockContentInstance.renderBlocksContent(); // вызываем ререндер у блока с контентом
    }

    /**
     * Запрос на получение данных
     * @returns {Promise<void>}
     */
    getIntitalData = async () => {
        const {url, scheme} = this.contentConfig;
        const {feed} = await getData(url);
        // Конструируем нужный формат данных на основе схемы
        this.contentState.data = constructData(feed.entry, scheme);
    }

    /**
     *  Метод рендеринга вызывает иницилизвцию вложенных инстансов
     */
    render = () => {
        const {categoriesInstance, blockContentInstance} = this;
        categoriesInstance.init();
        blockContentInstance.init();
    }

    /**
     *  Асинзронная иницилизация
     * @returns {Promise<void>}
     */
    init = async () => {
        await this.getIntitalData(); // установка исходных данных

        const {root, setFilters, contentConfig: {scheme}} = this;
        const contentFields = Object.keys(scheme); // наейминги для полей
        const parentParametrs = {
            methods: {setFilters},
            state: this.contentState,
            contentFields
        } // параметры родителя для проброса в дочерние инстансы

        // создание инстансов дочерних компонентов
        this.categoriesInstance = new Categories(CategoriesList, root, parentParametrs);
        this.blockContentInstance = new BlockContent(root, parentParametrs);

        // непосредственный рендеринг
        this.render();
    }
}
