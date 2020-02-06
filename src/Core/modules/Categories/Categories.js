import {toggleActive} from "utils";
/**
 *  @class Categories
 *  @param {HTMLElement} root - нода для рендеринга
 *  @param parentParams {Object} - параметры прокидываемые от родителя
 *  @param parentParams.state {Object} - данные которые хранятся в родителе
 *  @param parentParams.methods {Array} - методы для работы с
 *  @classdesc Класс для формирования категорий
 */
class Categories {
    constructor(root, {methods, state}) {
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

        /**
         * Коллбэк пробрасываемый в метод toggle
         */
        const callbackCategories = () => {
            if (category.classList.value.includes("active")) {
                setFilters(); // отчитска фильтра по категорям
            } else {
                setFilters(currentAttr,""); // установка фильтра по категорям
            }
        }

        return toggleActive({
            nodeList: this.nodeListCategories,
            currentAttr,
            attributeName
        }, "active", callbackCategories);
    }

    /**
     *  сброс класса active
     */
    clearCategories = ()=>{
        const {nodeListCategories} = this;
        for (let i = 0; i<nodeListCategories.length; i++){
            nodeListCategories[i].classList.remove("active");
        }
    }

    /**
     * Рендер ноды категории
     * @param text - описание
     * @param attr - [name] атрибут ноды
     * @returns {string} - Строка с нодой
     */
    renderCategory = ({name: text, id}) => {
        if(text==="default") return; // убираем дефолтную категорию
        const active = this.parentState.filters.category  === text? "active":"";
        return `<div class="catbtn ${active} category-${id}" name="${text}">${text}</div>`;
    };

    /**
     *  Рендер категорий
     */
    renderCategories = () => {
        const {root, renderCategory} = this;
        const categories = this.categoriesList.map(category => renderCategory(category)); // мапим категории
        /*Рендеринг*/
        const container = document.createElement("div");
        container.classList = "t-col t-col_10 t-prefix_1 t-text";
        container.innerHTML  = `        
                <div id="mycategories" class="inner_content">
                    ${categories.join("")}
                </div>`;
        root.appendChild(container);

        /*Установка обработчиков*/
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
