# Модуль контента для myphangan.ru

Для сборки модуля тербуется [node.js](https://nodejs.org "nidejs") (не меньше 13.7.0) 

[Описание компонентов](https://modecry.github.io/myPanghan/ "docs")

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
            
            var servicesUrl ="http://some.url";
            var categoriesUrl = "http://categories.url/"
            
            var SERVICE_SCHEME = {
                name: "gsx$name",
                whatsapp: "gsx$whatsapp",
                telegram: "gsx$telegram",
                instagram: "gsx$telegram",
                facebook: "gsx$facebook",
                service: "gsx$service",
                description: "gsx$description",
                cat: "gsx$cat",
                site: "gsx$site"
            };

            var ServicesConfig = {
                servicesUrl,
                categoriesUrl,
                scheme: SERVICE_SCHEME,
                filtersSettings: {
                    search: true,
                    fields: ["name", "service", "description"],
                }
            };

            var rootSettings = {
                blockContent: ".services-container",
                categories: ".categories-container",
                search: ".search-container",
            };

Иницилизация

    var ServicesContent = new StructuredContent(ServicesConfig, rootSettings);
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
