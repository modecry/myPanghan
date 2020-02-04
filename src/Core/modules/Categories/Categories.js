import {toggleAcive} from "utils";
/**
 *  Класс для формирования категорий
 */
class Categories {
    constructor(categoriesList, root, {methods, state}) {
        this.categoriesList = state.categories;  // массив категорий
        this.nodeListCategories = null;  // лист node  объектов
        this.root = root; // корневой root элемент
        this.parentMethods = methods; // родительские методы
        this.parentState = state; // родительский стейт
    }

    /**
     *  Замыкающий метод для обработки нажатия по категории
     * @param category - node экземпляр для навешивания
     * @returns {Function}
     */
    toggle(category) {
        const {
            viewCategories: nodeList, // node list  категорий
            parentMethods: {setFilters} // метод установки фильтров
        } = this;

        const attributeName = "name"; // требуемый атрибут для установки класса active
        const currentAttr = category.getAttribute(attributeName); // атрибут конкретной ноды
        const categoryName = category.innerText; // получаем нейминг категории

        /**
         * Коллбэк пробрасываемый в метод toggle
         */
        const callbackCategories = () => {
            const {search} = this.parentState.filters;
            if (category.classList.value.includes("active")) {
                setFilters(); // отчитска фильтра по категорям
            } else {
                setFilters(currentAttr); // установка фильтра по категорям
            }
        }

        return toggleAcive({
            nodeList: this.nodeListCategories,
            currentAttr,
            attributeName
        }, "active", callbackCategories);
    }

    /**
     *  Рендер ноды категории
     * @param text - описание
     * @param attr - [name] атрибут ноды
     * @returns {string} - Строка с нодой
     */
    renderCategory = ({name: text, className}) => {
        const active = this.parentState.filters.category  === className?"active":"";

        return `<div class="catbtn ${active}" name="${className}">${text}</div>`;
    };

    /**
     *  Рендер категорий
     *  TODO: переделать рендер
     */
    renderCategories = () => {
        const {root, renderCategory} = this;
        const categories = this.categoriesList.map(category => renderCategory(category)); // мапим категории

        // непосредственный рендер категорий в контейнер
        root.innerHTML = `
            ${root.innerHTML}
            <div class="t-col t-col_10 t-prefix_1 t-text">            
                <div id="mycategories" class="inner_content">
                    ${categories.join("")}
                </div>
            </div>
        `;

        this.nodeListCategories = document.querySelectorAll(".catbtn"); // определяем  лист node
        this.nodeListCategories.forEach(category =>
            category.addEventListener("click", this.toggle(category))
        ); // навешиваем обработчик на каждую ноду
    }

    /**
     * Иницилизация категорий
     */
    init = () => {
        this.renderCategories();
    };
}

export default Categories;
