/**
 * Фильтр поиска
 * @param search - искомая строка
 * @param array - массив объектов по которому осуществляется поиск
 * @param fields - поля по которым нужно соуществить поиск
 * @returns {array} - возвращает отфильтрованный array
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
