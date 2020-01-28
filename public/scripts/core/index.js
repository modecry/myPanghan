const CategoriesList = [
    {
        name:"Все",
        attr:"f-all"
    },
    {
        name:"Разное",
        attr:"cbspeaker"
    }
]

class StructuredContent {
    constructor(contentParams,selector){
        this.contentParams = contentParams;
        this.contentState = {
            filters:{
                search: "",
                category:""
            },
            data: []
        }
        this.root = document.querySelector(selector);
    }

    // установка фильтров и поисков
    setFilters = (currentCategory,currentSearch)=>{
        const {filters} = this.contentState;
        const search = currentSearch;
        const category = currentCategory;
        // устанавливаем фильтры
        this.contentState.filters = {search,category};
        this.blockContentInstance.reRender();
    }

    // запрос на получение данных
    getIntitalData = async ()=> {
        const {url,scheme} = this.contentParams;
        const data = await getData(url);
        this.contentState.data = constructData(data.feed.entry,scheme);
    }

    // рендеринг элементов
    render = ()=>{
        const {categoriesInstance,blockContentInstance} = this;
        categoriesInstance.init();
        blockContentInstance.init();
    }

    // иницилизация модуля
    init = async () =>{
        await this.getIntitalData();

        const {root,setFilters,contentParams:{scheme}} = this;
        const contentFields = Object.keys(scheme);
        const parentParametrs = {
            methods: {setFilters},
            state: this.contentState,
            contentFields
        }
        this.categoriesInstance  = new Categories(CategoriesList,root,parentParametrs);
        this.blockContentInstance = new BlockContent(root,parentParametrs);

        this.render();
    }
}