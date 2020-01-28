/**
 *  Класс для формирования категорий
 */
class Categories {
    constructor(categoriesList, root) {
        this.categoriesList = categoriesList;
        this.nodeListCategories = null;
        this.root = root;
    }
    // метод обработки клика по элементу
    toggle(category) {
        const {viewCategories:nodeList} = this;
        const dataAttribute = "name";
        const currentAttr = category.getAttribute(dataAttribute);

        return toggleAcive({nodeList:this.nodeListCategories, currentAttr, dataAttribute},"active");
    }

    renderCategory = ({name:text,attr})=>{
        return `<div class="catbtn" name="${attr}">${text}</div>`;
    };

    renderCategories = ()=>{
        const {root, renderCategory} = this;
        // создание категорий
        const categories = this.categoriesList.map(category=>{
            return renderCategory(category);
        });

        // непосредственный рендер категорий в контейнер
        root.innerHTML = `
            ${root.innerHTML}
            <div id="mycategories" class="t-rec_pt_0 t-rec_pb_30 t-container">
                ${categories}
            </div>
        `.replace(",","");

        this.nodeListCategories = document.querySelectorAll(".catbtn");
    }

    // Иницилазация категорий
    init = () => {
         this.renderCategories();
        // Навешивание обработчиков по клику
        this.nodeListCategories.forEach(category =>
            category.addEventListener("click", this.toggle(category))
        );
    };
}