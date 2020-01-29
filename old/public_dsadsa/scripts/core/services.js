/**
 * Сервис запроса  к данным
 * @param url - адрес запроса
 * @param data
 * @returns {Promise<any>}
 */
async function getData(url = "") {
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

/**
 * Сборщик данных  на основе схемы
 * @param data - данные
 * @param scheme - схема
 * @returns {array}
 */
const constructData = (data, scheme) => {
    return data.map(item => {
        const newObj = {};
        Object.keys(scheme).forEach(propName => {
            const schemeValueProp = scheme[propName];
            if (item.hasOwnProperty(schemeValueProp))
                newObj[propName] = item[schemeValueProp].$t;
        });
        return dataFormater(newObj);
    });
};

/**
 *  Форматирование свойств
 * @param obj - объект с измененными своствами
 */
const dataFormater = obj => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        switch (key) {
            // форматирование для фейсбука
            case "facebook":
                value.includes("http://") && value.replace("http", "https");
                break;

            // форматирование для инстаграма
            case "instagram":
                value = value
                    .trim()
                    .replace(/(\?.*)/, "")
                    .toLowerCase();
                value = value.match(/([a-z_.0-9]+)/g);
                value = value && value[value.length - 1];
                break;

            // форматирование для ватссапа
            case "whatsapp":
                value = value = value.replace(/[^0-9]/gi, "");
                value = value[0] == "8" ? `7 ${value.substring(1)}` : value;
                break;

            // форматирование для телеграмма
            case "telegram":
                value = value.trim().replace(/(\?.*)/, '').toLowerCase();
                value = value.replace(/^(\+?\d+)/g, '');
                value = value.match(/([a-z_][a-z_.0-9]+)/g);
                value = value && value[value.length - 1];
                break;
        }
        newObj[key] = value;
    });
    return newObj;
};

/**
 * Функция рендера шаблона
 * @param content - передаваемое значение
 * @param template - шаблон
 * @returns {string} - строка с нодой шаблона
 */
function renderTemplate(content, template) {
    return content ? template : "";
}
