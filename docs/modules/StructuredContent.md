<a name="StructuredContent"></a>

## StructuredContent
Основной класс релизующий общую логику и управляющий  отдельными частями модуля

**Kind**: global class  

* [StructuredContent](#StructuredContent)
    * [.getRootNodes](#StructuredContent+getRootNodes)
    * [.setIntitalData](#StructuredContent+setIntitalData) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.setQueryFilters](#StructuredContent+setQueryFilters)
    * [.setFilters](#StructuredContent+setFilters)
    * [.render](#StructuredContent+render)
    * [.init](#StructuredContent+init) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="StructuredContent+getRootNodes"></a>

### structuredContent.getRootNodes
Получаем ноды для рендеринга

**Kind**: instance property of [<code>StructuredContent</code>](#StructuredContent)  

| Param | Description |
| --- | --- |
| roots | объект с классами |

<a name="StructuredContent+setIntitalData"></a>

### structuredContent.setIntitalData ⇒ <code>Promise.&lt;void&gt;</code>
Запрос на получение данных

**Kind**: instance property of [<code>StructuredContent</code>](#StructuredContent)  
<a name="StructuredContent+setQueryFilters"></a>

### structuredContent.setQueryFilters
Установка  фильтров из url  и localStorage

**Kind**: instance property of [<code>StructuredContent</code>](#StructuredContent)  
<a name="StructuredContent+setFilters"></a>

### structuredContent.setFilters
Метод установки фильтров и поиска

**Kind**: instance property of [<code>StructuredContent</code>](#StructuredContent)  

| Param | Description |
| --- | --- |
| category | требуемая категория |
| search | строка с поиском |

<a name="StructuredContent+render"></a>

### structuredContent.render
Метод рендеринга вызывает иницилизвцию вложенных инстансов

**Kind**: instance property of [<code>StructuredContent</code>](#StructuredContent)  
<a name="StructuredContent+init"></a>

### structuredContent.init ⇒ <code>Promise.&lt;void&gt;</code>
Иницилизация модуля

**Kind**: instance property of [<code>StructuredContent</code>](#StructuredContent)  
