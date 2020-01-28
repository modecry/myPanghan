class BlockContent {
    constructor(root,{state,contentFields}) {
        this.data = state.data;
        this.root = root;
        this.parentState = state;
        this.contentFields = contentFields;
    }

    applyFilters = ()=>{
        const {category,search} = this.parentState.filters;
        if(category||search){
            const data = [];
            this.data = this.data.filter((element)=>{
                let matches = 0;
                this.contentFields.forEach(field=>{
                    // TODO: доработать фильтры
                });
                return Boolean(matches);
            })
        }else{
             this.data = this.parentState.data;
        }
    }

    reRender = ()=>{
        this.applyFilters();
        console.log(this.data);
    }

    renderBlockItem = ({})=>{

    }

    renderBlockContent = ()=>{

    }

    init = ()=>{
        this.applyFilters();
        console.log(this.data);
    }
}
