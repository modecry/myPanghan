// utils
import {filterData} from "utils";

// services
import {renderTemplate} from "services";

/**
 *  @class BlockContent
 *  @param {HTMLElement} root - нода для рендеринга
 *  @param parentParams {Object} - параметры прокидываемые от родителя
 *  @param parentParams.state {Object} - данные которые хранятся в родителе
 *  @param parentParams.contentFields {Array} - поля покторым нужно делать фильтр
 *  @classdesc Класс реализущий вывод основных блоков с контентом на основе данных
 */
class BlockContent {
    constructor(root, {state, contentFields}) {
        this.filtredState = state.data;
        this.root = root; // корневой элемент для рендера
        this.parentState = state; // родительский стейт
        this.childrenNodes = [];
        this.contentFields = contentFields; // нейминги полей для фильтрации
    }

    /**
     *  Метод применения фильтров и поиска
     *  @return {Void}
     */
    applyFilters = () => {
        const {categories} = this.parentState; // лист категорий
        const {category, search} = this.parentState.filters; // значения фильтров
        this.filtredState = this.parentState.data.map(({id}) => id); // мапим массив id's всеъ элементов

        if (category) {
            const cat = categories.find(({name}) => name === category); // находим значение категории
            if (cat) {
                this.filtredState = filterData(cat.name, this.parentState.data, ["cat"]).map(({id}) => id); // фильтруем массив id's
            }
        }

        if (search) {
            this.filtredState = filterData(search, this.parentState.data, this.contentFields).map(({id}) => id);
        }

        this.toggleVisible(); // переключение видимости блоков
    };

    /**
     *  Скрывает / Показывает блоки в зависимости от массива идентификаторов
     *  @return {Void}
     */
    toggleVisible = () => {
        const {childrenNodes, filtredState} = this;
        for (let i = 0; i < childrenNodes.length; i++) {
            const attr = childrenNodes[i].getAttribute("data-id");
            childrenNodes[i].classList.add("hidden");
            if (filtredState.includes(parseInt(attr))) {
                childrenNodes[i].classList.remove("hidden");
            }
        }
    }


    /**
     *  Метод рендера одного экземпляра блока с контентом
     * @param {String} name - имя
     * @param {String} whatsapp - никнейм ватсап
     * @param {String} telegram - никнейм телега
     * @param {String} instagram - никнейм инстаграм
     * @param {String} facebook - никнейм фейсбук
     * @param {String} service - название услуги
     * @param {String} description - заголовок услуги
     * @param {String} id - id для data атрибута
     * @param {String} cat - название категории
     * @param {String} cat - website
     * @returns {String} - строка с DOM элементом
     */
    renderBlock = ({name, whatsapp, telegram, instagram, facebook, service, description, id, cat, site}) => {
        console.log(instagram);
        // заголовок
        const title = renderTemplate(service, `<div class="t513__title t-heading t-heading_xs">${service}</div>`);
        // картинка с категорией
        const defaultCategory = this.parentState.categories.find(({name})=>name==="default")?.image;
        const targetCategory =  this.parentState.categories.find(({name})=>name===cat)?.image;
        const targetCategoryImageUrl = targetCategory || defaultCategory; // урл для отображения картинки

        const categoryImage = renderTemplate(targetCategoryImageUrl,`<div class="content-block-image"><img src="${targetCategoryImageUrl}"></div>`)

        // whatsapp
        const whatsApp = renderTemplate(whatsapp, `<a href="https://wa.me/${whatsapp}" target="_blank">WhatsApp</a>`);

        // telegram
        const telegrm = renderTemplate(telegram, `<a href="tg://resolve?domain=${telegram}" target="_blank">Telegram</a>`);

        // insta
        const insta = renderTemplate(instagram, `<a href="https://instagram.com/${instagram}" target="_blank">Instagram</a>`);

        // facebook
        const facebk = renderTemplate(facebook, `<a href="${facebook}" target="_blank">Facebook</a>`);

        // web-site
        const webSite = renderTemplate(site, `<a href="${site}" target="_blank">Веб-сайт</a>`);

        //  контакты
        const contacts = renderTemplate(name, `<div class="content-block-contacts"><span class="person-name">${name}</span>${whatsApp}${telegrm}${insta}${facebk}${webSite}</div>`);

        // описание
        const desc = renderTemplate(name, `<div class="content-block-description">${description}</div>`);

        // возвращаем темплейт
        return `<div class="content-block" data-id="${id}">${title}<div class="content-block-inner">${categoryImage}<div>${contacts}${desc}</div></div></div>`;
    }

    /**
     *  Рендер блоков на основе данных
     *  @return {Void}
     */
    renderBlocksContent = () => {
        const {root, parentState: {data}, renderBlock} = this;
        const services = data.map(renderBlock); // мапим блоки по шаблонному методу

        // render блока
        const blocksContainer = document.createElement("div");
        blocksContainer.classList = "t-col t-col_10 t-prefix_1 t-text";
        blocksContainer.innerHTML = services.join("");
        root.appendChild(blocksContainer);

        this.childrenNodes = blocksContainer.children; // сохраняем коллекцию дочерних элементов

    }

    /**
     *  Иницилизация блока
     *  @return {Promise<void>}
     */
    init = async () => {
        this.renderBlocksContent();
        await this.applyFilters();
    }
}

export default BlockContent;
