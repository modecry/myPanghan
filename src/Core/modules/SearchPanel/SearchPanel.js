// services
import {renderTemplate} from "services";

/**
 * Класс панели поиска
 * TODO: оставить коментарии, добавить debounce
 */
class SearchPanel {
    constructor(root, {methods, state}) {
        this.methods = methods;
        this.root = root;
        this.parentState = state;
    }

    onSearch = (serachInput) => {
        const {setFilters} = this.methods;
        return () => {
            const value = serachInput.value;
            const {category} = this.parentState.filters;
            setFilters(category, value);
        }
    }


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
        const serarchInput = document.querySelector(".searchTerm");

        searchButton.addEventListener("click", this.onSearch(serarchInput))
    }

    init = async () => {
        await this.render();
    }
}

export default SearchPanel;