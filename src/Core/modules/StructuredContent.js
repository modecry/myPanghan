// services
import {getData, constructData, categoryCollector} from "services";
import changeQuries from "services/changeQuries"
// submodules
import BlockContent from "./BlockContent/BlockContent";
import Categories from "./Categories/Categories";
import SearchPanel from "./SearchPanel/SearchPanel";

/**
 *  Основной класс релизующий общую логику и управляющий  отдельными частями модуля
 */
class StructuredContent {
    constructor(contentConfig, rootSettings) {
        this.contentConfig = contentConfig; // основная конфигурация
        this.contentState = {
            filters: {
                search: "",
                category: ""
            },
            data: [],
            categories: []
        } // базовый стейт
        this.rootNodes = {};
        this.getRootNodes(rootSettings);
    }

    /**
     * Метод установки фильтров и поиска
     * @param category - требуемая категория
     * @param search - строка с поиском
     */
    setFilters = (category = "", search = "") => {
        const {blockContentInstance} = this;
        // значение фильтров
        const categoryValue = category ? category : "";
        const searchValue = search ? search : "";

        const quires = [{name: "category", value: categoryValue}, {name: "search", value: searchValue},];

        this.contentState.filters = {search: searchValue, category: categoryValue};// устанавливаем фильтры
        changeQuries(quires); // сохранение фильтров в url и  localStorage

        if (blockContentInstance) blockContentInstance.reRenderBlocks(); // вызываем ререндер у блока с контентом)

    }
    /**
     * Получаем ноды для рендеринга
     * @param roots - объект с классами
     */
    getRootNodes = (roots)=> {
        for (let key in roots) {
            const val = roots[key];
            this.rootNodes[key] = document.querySelector(val);
        }
    }

    /**
     * Запрос на получение данных
     * @returns {Promise<void>}
     */
    getIntitalData = async () => {
        const {url, scheme} = this.contentConfig;
        const {feed} = await getData(url); // запрашиваем данные
        this.contentState.data = constructData(feed.entry, scheme); // форматируем данные на основе схемы
        this.contentState.categories = categoryCollector(this.contentState.data); // собираем категории
        this.getQueryFilters(); //  получем фильтры
    }

    /**
     *  Получение фильтров
     */
    getQueryFilters = () => {
        const urlParams = new URLSearchParams(window.location.search);

        // GET  парамеmы
        const queryCategory = urlParams.get("category");
        const querySearch = urlParams.get("search");

        if (queryCategory || querySearch) {
            this.setFilters(queryCategory, querySearch);
        } else {
            this.setFilters(localStorage["category"]);
        }
    }

    /**
     *  Метод рендеринга вызывает иницилизвцию вложенных инстансов
     */
    render = () => {
        const {categoriesInstance, blockContentInstance, contentConfig: {filtersSettings}} = this;
        categoriesInstance.init();
        blockContentInstance.init();
        if (filtersSettings.search) {
            this.searchPanel.init();
        }
    }

    /**
     *  Асинзронная иницилизация
     * @returns {Promise<void>}
     */
    init = async () => {
        await this.getIntitalData(); // установка исходных данных
        const {rootNodes, setFilters, contentConfig: {scheme, filtersSettings}} = this;
        const contentFields = filtersSettings.fields; // наейминги для полей
        const parentParametrs = {
            methods: {setFilters},
            state: this.contentState,
            contentFields
        } // параметры родителя для проброса в дочерние инстансы

        // инстанс категорий
        this.categoriesInstance = new Categories(this.rootNodes.categories, parentParametrs);
        // инстанс блока с контентом
        this.blockContentInstance = new BlockContent(this.rootNodes.services, parentParametrs);

        if (filtersSettings.search) {
            parentParametrs.methods = {...parentParametrs.methods,clearCategories:this.categoriesInstance.clearCategories}; // снятие классов active со всех элементов категорий
            this.searchPanel = new SearchPanel(this.rootNodes.search, parentParametrs);
        }

        // непосредственный рендеринг
        this.render();
    }
}

export default StructuredContent;
