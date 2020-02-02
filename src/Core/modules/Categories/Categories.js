import {toggleAcive} from "utils";
/**
 *  Класс для формирования категорий
 */
class Categories {
    constructor(categoriesList, root, {methods, state}) {
        this.categoriesList = categoriesList;  // массив категорий
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
                setFilters("", search); // отчитска фильтра по категорям
            } else {
                setFilters(categoryName, search); // установка фильтра по категорям
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
    renderCategory = ({name: text, attr}) => {
        return `<div class="catbtn" name="${attr}">${text}</div>`;
    };

    /**
     *  Рендер категорий
     */
    renderCategories = () => {
        const {root, renderCategory} = this;
        const categories = this.categoriesList.map(category => renderCategory(category)); // мапим категории

        // непосредственный рендер категорий в контейнер
        root.innerHTML = `
            ${root.innerHTML}
            <div id="mycategories" class="t-rec_pt_0 t-rec_pb_30 t-container">
                ${categories.join("")}
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
