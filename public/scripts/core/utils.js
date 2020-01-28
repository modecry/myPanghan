/**
 *  Функция toggle  для  элементов
 * @param nodeList - лист элеменов
 * @param currentId - текущий идентификатор
 * @param dataAttribute - атрибут по которому определяется элемент
 * @param selector - селектор для метода toggle
 * @returns {Function}  - возвращаемая функция для работы с конкретном элементе
 */
function toggleAcive({nodeList, currentAttr, dataAttribute}, selector) {
    return function() {
        nodeList.forEach(element => {
            const iterableAttr = element.getAttribute(dataAttribute);
            if (iterableAttr !== currentAttr) {
                element.classList.remove(selector);
            }
        });
        this.classList.toggle(selector);
    };
}