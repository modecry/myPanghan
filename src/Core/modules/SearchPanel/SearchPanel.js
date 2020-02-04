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
                    <svg id="Capa_1" enable-background="new 0 0 515.558 515.558" height="512" viewBox="0 0 515.558 515.558" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"/></svg>
                </button>
        `;
        // render  панели поиска
        const SearchContainer = document.createElement("div");
        SearchContainer.classList = "search-panel inner_content";
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
