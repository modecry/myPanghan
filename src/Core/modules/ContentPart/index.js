/**
 * @class ContentPart
 * @classdesc Базовый класс иницилизирующий контент
 */
class ContentPart {
    constructor(root,params){
        this.root = root;
        this.params = params;
    }

    didRender = ()=>{
        console.log("componentDidRender");
    }

    withDOM = async (content)=>{
       await this.root.appendChild(content);
        this.didRender();
    }

    render = ()=>{
        console.log("render")
        return "";
    }

    init = async ()=>{
        const {withDOM,render} = this;
       await withDOM(render());
    }

}

export default  ContentPart;