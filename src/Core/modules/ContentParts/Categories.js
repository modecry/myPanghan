import {toggleActive} from "utils";
import ContentPart from "../ContentPart";
class Categories  extends ContentPart{

    constructor(root,params){
        super(root,params);
        this.nodeListCategories = null;
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
     *  Замыкающий метод для обработки нажатия по категории
     * @param category - node экземпляр для навешивания
     * @returns {Function}
     */
    toggle(category) {
        const {setFilters} = this.params.methods;

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
     * Рендер ноды категории
     * @param text - описание
     * @param attr - [name] атрибут ноды
     * @returns {string} - Строка с нодой
     */
    renderCategory = ({name: text, id}) => {
        const {category} = this.params.state.filters;
        if(text==="default") return; // убираем дефолтную категорию
        const active = category  === text? "active":"";
        return `<div class="catbtn ${active} category-${id}" name="${text}">${text}</div>`;
    };


    didRender = ()=>{
        /*Установка обработчиков*/
        this.nodeListCategories = document.querySelectorAll(".catbtn"); // определяем  лист node
        this.nodeListCategories.forEach(category =>
            category.addEventListener("click", this.toggle(category))
        ); // навешиваем обработчик на каждую ноду
    }

    render=()=>{
        const container = document.createElement("div");
        const categories = this.params.state.categories.map(category => this.renderCategory(category)); // мапим категории
        container.classList = "t-col t-col_10 t-prefix_1 t-text";
        container.innerHTML  = `        
                <div id="mycategories" class="inner_content">
                    ${categories.join("")}
                </div>`;
        return container;
    }
}



export default Categories;
