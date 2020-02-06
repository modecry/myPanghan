/**
 * Функция рендера шаблона
 * @param content - передаваемое значение
 * @param template - шаблон
 * @returns {string} - строка с нодой шаблона
 */
const renderTemplate = (content, template) => {
    return content ? template : "";
}

export default renderTemplate;
