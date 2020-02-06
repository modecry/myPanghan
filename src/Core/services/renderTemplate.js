/**
 * Функция рендера шаблона
 * @param {String} content - передаваемое значение
 * @param {String} template - шаблон
 * @returns {String} - строка с шаблонаом или пустая строка
 */
const renderTemplate = (content, template) => {
    return content ? template : "";
}

export default renderTemplate;
