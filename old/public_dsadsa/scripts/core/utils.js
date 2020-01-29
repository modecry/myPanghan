/**
 *  Функция toggle  для  элементов
 * @param nodeList - лист элеменов
 * @param currentId - текущий идентификатор
 * @param attributeName - атрибут по которому определяется элемент
 * @param selector - селектор для метода toggle
 * @returns {Function}  - возвращаемая функция для работы с конкретном элементе
 */
function toggleAcive({nodeList, currentAttr, attributeName}, selector, callback) {
    return function() {
        nodeList.forEach(element => {
            const iterableAttr = element.getAttribute(attributeName);
            if (iterableAttr !== currentAttr) {
                element.classList.remove(selector);
            }
        });
        callback && callback();
        this.classList.toggle(selector);
    };
}
