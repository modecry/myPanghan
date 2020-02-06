/**
 *  Сервис для сохраниния данных в url и local storage
 * @param queries {array} - массив  объектов для сохраненения/изменения данных
 * @return {Void}
 */
const changeQuries = (queries) => {
    const pathName = window.location.pathname; // получаем текущий pathname

    let quriesParts = queries.map((query) => { // мапим в массив  преобразованных путей
        if (!pathName.includes(query.name)) {
            if (query.value) return saveQuery(query); // сохраняем значение
            else
                return deleteQuery(query); // удаяем значение
        }
    }).filter(Boolean); // отбрасывем пустые

    if (quriesParts.length > 1) {
        quriesParts = `${quriesParts.join("&")}`; // объеденяем по сепаратору
    } else {
        quriesParts = quriesParts.join("");//  объеденяем по дефолту
    }

    const path = quriesParts ? `${pathName}?${quriesParts}` : pathName; // новый путь для pathname

    window.history.replaceState({}, "", path); // меняем pathname
}

/**
 *  Функципя сохранения параметров в localStorage и преобразования
 * @param name  - ключ
 * @param value - значение
 * @returns {string} - строка с преобразованными данными
 */
const saveQuery = ({name, value}) => {
    const urlPart = `${name}=${value}`;
    localStorage[name] = value;
    return urlPart;
};

/**
 *  Функция для удаления параметров из localStorage  и преобразования
 * @param name - ключ
 * @returns {string} - возвращает пустую строку
 */
const deleteQuery = ({name}) => {
    localStorage.removeItem(name);
    return "";
};


export default changeQuries;
