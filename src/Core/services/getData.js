/**
 * Сервис запроса  к данным
 * @param {String} url - адрес запроса
 * @param {Function} callback - коллбэк
 * @returns {(Promise<any>|null)}
 * @memberof module:Services
 */
const getData = async (url = "",callback) => {
    try {
        return await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            callback && callback(); // вызов коллбэка
            return response.json()
        });
    } catch (e) {
        console.log(`REQUEST ERROR!!!: ${e}`);
        return null;
    }
}

export default  getData;
