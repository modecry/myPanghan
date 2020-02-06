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
            case "site":
                if (!value) break;
                value = value.includes("http") ? value : `http://${value}`;
                break;
        }
        newObj[key] = value;
    });
    return newObj;
};

export default dataFormater;
