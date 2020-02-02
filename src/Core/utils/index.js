/**
 *  Функция toggle  для  элементов
 * @param nodeList - лист элеменов
 * @param currentId - текущий идентификатор
 * @param attributeName - атрибут по которому определяется элемент
 * @param selector - селектор для метода toggle
 * @returns {Function}  - возвращаемая функция для работы с конкретном элементе
 */
export function toggleAcive({nodeList, currentAttr, attributeName}, selector, callback) {
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

/**
 * Фильтр поиска
 * @param search - искомая строка
 * @param array - массив объектов по которому осуществляется поиск
 * @param fields - поля по которым нужно соуществить поиск
 * @returns {array} - возвращает отфильтрованный array
 */
export const filterData = (search, array, fields) =>
    array.filter(element => {
      let matches = 0;
      fields.forEach(field => {
            if (element[field]) {
                element[field].includes(search) && matches ++;
            }
        })
        return matches;
    });