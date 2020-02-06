/**
 * Сервис запроса  к данным
 * @param {String} url - адрес запроса
 * @returns {(Promise<any>|null)}
 * @memberof module:Services
 */
const getData = async (url = "") => {
    try {
        return await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => response.json());
    } catch (e) {
        console.log(`REQUEST ERROR!!!: ${e}`);
        return null;
    }
}

export default  getData;
