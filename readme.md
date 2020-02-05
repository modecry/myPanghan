# Модуль контента для myphangan.ru

Для сборки модуля тербуется [node.js](https://nodejs.org "nidejs") (не меньше 13.7.0) 

[Документация по компонентам](https://github.com/modecry/myPanghan/tree/master/docs "docs")

**Иснтрукция по установке**
1. Перейти в деррикторию `cd myPhangan/`
2. Запустить `npm i` и дождаться установки модулей

**Запуск в dev режиме**

Что бы иницилизировать запуск в dev режиме, нужно выполнить команду `npm run dev`. По умолчанию сервер будет доступен
 по адресу `http://localhost:9000`
 
**Сборка проекта**

Запуск сборки проекта осуществляется командой `npm run build`. 
Сборка будет выгруженна в директорию:  `myPhangan/build`

**Пример использлования**

Параметры инциилизации
 
    const SERVICE_SCHEME = {
        name: "gsx$name",
        whatsapp: "gsx$whatsapp",
        telegram: "gsx$telegram",
        instagram: "gsx$telegram",
        facebook: "gsx$facebook",
        service: "gsx$service",
        description: "gsx$description",
        cat: "gsx$cat"
    };
    
     const rootSettings = {
        blockContent: ".services-container",
        categories: ".categories-container",
        search: ".search-container",
     };
    const url = "http://someurl.fetch/";
    
     
    const ServicesConfig = {
        url: url,
        scheme: SERVICE_SCHEME,
        filtersSettings: {
            search: true,
            fields: ["name", "service", "description"],
        }
    };

Иницилизация

    const ServicesContent = new StructuredContent(ServicesConfig, rootSettings);
    ServicesContent.init(); // инициализируем контент

**Структура проекта**
```
+---Core
|   +---modules
|   |   +---BlockContent
|   |   +---Categories
|   |   \---SearchPanel
|   +---services
|   \---utils
\---templates
```
