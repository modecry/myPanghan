/**
 * Фильтр поиска
 * @param {String} search - искомая строка
 * @param {Array} array - массив объектов по которому осуществляется поиск
 * @param {Array} fields - поля по которым нужно соуществить поиск
 * @returns {Array} - возвращает отфильтрованный array
 * @memberof module:Утилиты
 */
const filterData = (search, array, fields) =>
    array.filter(element => {
        let matches = 0;
        fields.forEach(field => {
            if (element[field]) {
                element[field].toLowerCase().includes(search.toLowerCase()) && ++matches;
            }
        })
        return matches;
    });

export default filterData;
