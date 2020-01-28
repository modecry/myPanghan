const CategoriesList = [
    {
        name:"Все",
        attr:"f-all"
    },
    {
        name:"мастер классы",
        attr:"cbspeaker"
    }
]

class StructuredContent {
    constructor(contentParams,selector){
        this.contentParams = contentParams;
        this.contentState = {
            filters:{
                search: null,
                category:null
            },
            data: []
        }
        this.root = document.querySelector(selector);
    }

    // запрос на получение данных
    getIntitalData = async ()=> {
        const {url} = this.contentParams;
        this.contentState.data = await getData(url);
    }

    // иницилизация модуля
    init = () =>{
        const {root} = this;
        const { data } = this.contentState;
        this.getIntitalData();

        this.categoriesInstance  = new Categories(CategoriesList,root);
        this.blockContentInstance = new BlockContent(data,root);

        this.render();
    }

    render = ()=>{
        const {categoriesInstance} = this;
        categoriesInstance.init();
    }
}