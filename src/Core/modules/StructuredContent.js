// services
import {getData, constructData, categoryCollector} from "services";
import changeQuries from "services/changeQuries"
// submodules
import BlockContent from "./ContentParts/BlockContent";
import Categories from "./ContentParts/Categories";
import SearchPanel from "./ContentParts/SearchPanel";

/**
 *  @class StructuredContent
 *  @param {Object} contentConfig - основной объект для конифигурации рбаоты
 *  @param {Object} rootSettings - настройке для node элементов куда будет рендерится контент
 *  @classdesc Основной класс релизующий общую логику и управляющий  отдельными частями модуля
 */
class StructuredContent {
    constructor(contentConfig, rootSettings) {
        this.contentConfig = contentConfig; // основная конфигурация
        this.contentState = {
            filters: {
                search: "", // значение поиска
                category: "" // значение категории
            },
            data: [], // массив данных
            categories: [] // список категорий
        } // базовый стейт
        this.rootNodes = {}; // корневые node  элементы
        this.getRootNodes(rootSettings); // получаем корневые node  элементы
    }

    /**
     * Получаем ноды для рендеринга
     * @param {Object} roots - объект с классами
     * @return {Void}
     */
    getRootNodes = (roots) => {
        for (let key in roots) {
            const val = roots[key];
            this.rootNodes[key] = document.querySelector(val);
        }
    }

    /**
     * Запрос на получение данных
     * @async
     * @returns {Promise<void>}
     */
    setIntitalData = async () => {
        const {contentFetch, categoriesUrl, scheme} = this.contentConfig;
        const {url:servicesUrl,callbackFetch} = contentFetch;

        const {feed: servicesData} = await getData(servicesUrl,callbackFetch); // запрашиваем данные сервисов
        const {feed: categoriesData} = await getData(categoriesUrl);

        this.contentState.categories = constructData(categoriesData.entry, { // категории
            name: "gsx$cat",
            image: "gsx$img"
        }).sort(({name: a}, {name: b}) => { // сортировка категорий по алфавиту
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });

        this.contentState.data = constructData(servicesData.entry, scheme); // форматируем данные на основе схемы
        this.setQueryFilters(); // устанавливаем исходные фильтры
    }

    /**
     *  Установка  фильтров из url  и localStorage
     *  @return {Void}
     */
    setQueryFilters = () => {
        const urlParams = new URLSearchParams(window.location.search);

        // GET  параметры
        const queryCategory = urlParams.get("category");
        const querySearch = urlParams.get("search");

        if (queryCategory || querySearch) {
            this.setFilters(queryCategory, querySearch);
        } else {
            this.setFilters(localStorage["category"]);
        }
    }

    /**
     * Метод установки фильтров и поиска
     * @param {String} category - требуемая категория
     * @param {String} search - строка с поиском
     */
    setFilters = (category = "", search = "") => {
        const {blockContentInstance} = this;
        // значение фильтров
        const categoryValue = category ? category : "";
        const searchValue = search ? search : "";

        const quires = [{name: "category", value: categoryValue}, {name: "search", value: searchValue},];

        this.contentState.filters = {search: searchValue, category: categoryValue};// устанавливаем фильтры
        changeQuries(quires); // сохранение фильтров в url и  localStorage

        if (blockContentInstance) blockContentInstance.applyFilters(); // применяем фильтры

    }

    /**
     *  Метод рендеринга вызывает иницилизвцию вложенных инстансов
     *  @return {void}
     */
    render = () => {
        const {categoriesInstance, blockContentInstance, contentConfig: {filtersSettings}} = this;
        /// иницилизация инстансов
        categoriesInstance.init();
        blockContentInstance.init();

        if (filtersSettings.search) {
            this.searchPanel.init();
        }
    }

    /**
     *  Иницилизация модуля
     * @async
     * @returns {Promise<void>}
     */
    init = async () => {
        await this.setIntitalData(); // установка исходных данных
        const {
            contentState,
            render,
            setFilters,
            rootNodes: {categories, blockContent, search},
            contentConfig: {filtersSettings}
        } = this;

        const parentParametrs = {
            state: contentState, // стейт
            contentFields: filtersSettings.fields, // нейминги для поиска
            methods: {setFilters},
        } // параметры родителя для проброса в дочерние инстансы

        /*Объявление инстансов*/
        this.categoriesInstance = new Categories(categories, parentParametrs);
        this.blockContentInstance = new BlockContent(blockContent, parentParametrs);
        // проверка на существование панели поиска
        if (filtersSettings.search) {
            parentParametrs.methods = {
                ...parentParametrs.methods,
                clearCategories: this.categoriesInstance.clearCategories // снятие классов active со всех категорий
            };

            this.searchPanel = new SearchPanel(search, parentParametrs);
        }

        // непосредственный рендеринг
        render();
    }
}

export default StructuredContent;
