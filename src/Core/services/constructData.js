import  dataFormater from "./dataFormater";
/**
 * Сборщик данных  на основе схемы
 * @param {Array} data - данные
 * @param {Object} scheme - схема
 * @returns {Array} массив сформированных данных
 */
const constructData = (data, scheme) => {
    return data.map((item, index) => {
        const newObj = {};
        newObj["id"] = index;
        Object.keys(scheme).forEach((propName) => {
            const schemeValueProp = scheme[propName];
            if (item.hasOwnProperty(schemeValueProp))
                newObj[propName] = item[schemeValueProp].$t;
        });
        return dataFormater(newObj);
    });
};


export default  constructData;
