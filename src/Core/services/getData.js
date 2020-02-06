/**
 * Сервис запроса  к данным
 * @param url - адрес запроса
 * @param data
 * @returns {Promise<any>}
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
