// utils
import {filterData} from "utils";

// services
import {renderTemplate} from "services";

/**
 *  Класс реализущий вывод основных блоков с контентом на основе данных
 */
class BlockContent {
    constructor(root, {state, contentFields}) {
        this.data = state.data; // установка дефолтного стейта
        this.root = root; // корневой элемент для рендера
        this.parentState = state; // родительский стейт
        this.contentFields = contentFields; // нейминги полей
    }

    /**
     *  Метод применения фильтров и поиска
     */
    applyFilters = () => {
        const {category, search} = this.parentState.filters;
        if (category) {
            this.data = filterData(category, this.parentState.data, ["category"]);
        }
        if (search) {
            const withOutCategory = this.contentFields.filter(item=>item!=="category");
            this.data = filterData(search, this.data, withOutCategory);
        }
    };

    /**
     *  Метод рендера 1 экземпляра блока с контентом
     * @param name - имя
     * @param whatsapp - никнейм ватсап
     * @param telegram - никнейм телега
     * @param instagram - никнейм инстаграм
     * @param facebook - никнейм фейсбук
     * @param service - название услуги
     * @param description - заголовок услуги
     * @param index - индекс для data атрибута
     * @returns {string} - строка с DOM элементом
     */
    renderBlock = ({name, whatsapp, telegram, instagram, facebook, service, description, index}) => {

        // заголовок
        const title = renderTemplate(service, `
            <div class="t513__title t-heading t-heading_xs">
               ${service}
            </div>
        `);

        // имя
        const constantName = renderTemplate(name, `
            <div class="block-contacts-item">
            <strong>Имя:</strong> ${name}
            </div>
        `);

        // whatsapp
        const whatsApp = renderTemplate(whatsapp, `
            <a href="https://wa.me/${whatsapp}" target="_blank">WhatsApp</a>
        `);

        // telegram
        const telegrm = renderTemplate(telegram, `
            <a href="tg://resolve?domain=${telegram}" target="_blank">Telegram</a>
        `);

        // insta
        const insta = renderTemplate(instagram, `
            <a href="https://instagram.com/${instagram}" target="_blank">Instagram</a>
        `);

        // facebook
        const facebk = renderTemplate(facebook, `
            <a href="https://www.facebook.com/${facebook}" target="_blank">Facebook</a>
        `);

        // социальные сети
        const socials = `
            <div class="block-contacts-item">
              <div class="socials">
                <strong>Социальные сети: </strong>
                ${whatsApp}
                ${telegrm}
                ${insta}
                ${facebk}
              </div>
            </div>
        `;

        // описание
        const desc = renderTemplate(name, `
            <div class="content-block-description">
              ${description}
            </div>
        `);

        // возвращаем темплейт
        return `
              <div class="content-block" data-index="${index}">
                  ${title}
                  <div class="content-block-title">Контакты</div>
                  <div class="content-block-contacts">
                    ${constantName}
                    ${socials}
                  </div>
                  <div class="content-block-title">Описание:</div>
                  ${desc}
              </div>
              `;
    }

    /**
     *  Рендер блоков на основе данных
     */
    renderBlocksContent = () => {
        const {root, data, renderBlock} = this;
        const services = data.map(service => renderBlock(service)); // мапим блоки по шаблону
        // render блока
        const hasBlockContainer = document.querySelector(".blocks");
        const blocksContainer = document.createElement("div");
        blocksContainer.classList.add("blocks");
        blocksContainer.innerHTML = services.join("");
        // проверка на существование блока
        if (hasBlockContainer) {
            root.replaceChild(blocksContainer, hasBlockContainer);
        } else {
            root.appendChild(blocksContainer);
        }
    }

    /**
     * Ре-рендер блоков
     * @returns {Promise<void>}
     */
    reRenderBlocks = async () => {
        this.data = this.parentState.data;
        await this.applyFilters();
        this.renderBlocksContent();
    }

    /**
     *  Иницилизация блока
     */
    init = async () => {
        await this.applyFilters();
        this.renderBlocksContent();
    }
}

export default BlockContent;
