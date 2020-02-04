// services
import {renderTemplate} from "services";

/**
 * Класс панели поиска
 */
class SearchPanel {
    constructor(root, {methods, state}) {
        this.methods = methods; // родительские методы
        this.root = root; // корневой DOM элемент
        this.parentState = state; // родительский стейт
    }

    /**
     * Функция установки поиска
     * @param value - значение поиска
     */
    setSearch = (value) => {
        const {category} = this.parentState.filters;
        this.methods.setFilters(category, value);
    }

    /**
     *  Обработчик клика по кнопке поиска
     * @param serachInput - требуемый Node елемент
     * @returns {Function} - возвращается функция вызова изменения фильтров
     */
    onButtonClick = (searchInput) => {
        const {setFilters} = this.methods;
       return ()=>this.setSearch(searchInput.value);
    }

    /**
     *  Обработчик нажатия Enter
     * @param e - event объект
     */
    onEnterClickHandler = (e) => {
        if (e.keyCode === 13)
            this.setSearch(e.target.value);
    }

    /**
     *  рендер шаблона поиска
     */
    render = () => {
        const {root} = this;
        const searchInner = `
                <input type="text" class="searchTerm" placeholder="Поиск...">
                <button class="searchButton">
                    <i class="fa fa-search"></i>
                </button>
        `;
        // render  панели поиска
        const SearchContainer = document.createElement("div");
        SearchContainer.classList.add("search-panel");
        SearchContainer.innerHTML = searchInner;
        root.appendChild(SearchContainer);

        const searchButton = document.querySelector(".searchButton");
        const searchInput = document.querySelector(".searchTerm");

        searchButton.addEventListener("click", this.onButtonClick(searchInput)); // обработчик на клик
        searchInput.addEventListener("keydown", this.onEnterClickHandler); // обработчик на нажатие ENTER
    }

    /**
     * Иницилизация модуля
     * @returns {Promise<void>}
     */
    init = async () => {
        await this.render();
    }
}

export default SearchPanel;
