/**
 *  Функция toggle  для  элементов
 * @param {HTMLAllCollection} nodeList - лист элеменов
 * @param {number} currentId - текущий идентификатор
 * @param {String} attributeName - атрибут по которому определяется элемент
 * @param {String} selector - селектор для метода toggle
 * @returns {Function}  - возвращаемая функция для работы с конкретном элементе
 * @memberof module:Utils
 */
function toggleActive({nodeList, currentAttr, attributeName}, selector, callback) {
    return function () {
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

export default toggleActive;
