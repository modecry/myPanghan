<a name="SearchPanel"></a>

## SearchPanel
Класс панели поиска

**Kind**: global class  

* [SearchPanel](#SearchPanel)
    * [.setSearch](#SearchPanel+setSearch)
    * [.onButtonClick](#SearchPanel+onButtonClick) ⇒ <code>function</code>
    * [.onEnterClickHandler](#SearchPanel+onEnterClickHandler)
    * [.render](#SearchPanel+render)
    * [.init](#SearchPanel+init) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="SearchPanel+setSearch"></a>

### searchPanel.setSearch
Функция установки поиска

**Kind**: instance property of [<code>SearchPanel</code>](#SearchPanel)  

| Param | Description |
| --- | --- |
| value | значение поиска |

<a name="SearchPanel+onButtonClick"></a>

### searchPanel.onButtonClick ⇒ <code>function</code>
Обработчик клика по кнопке поиска

**Kind**: instance property of [<code>SearchPanel</code>](#SearchPanel)  
**Returns**: <code>function</code> - - возвращается функция вызова изменения фильтров  

| Param | Description |
| --- | --- |
| searchInput | требуемый Node елемент |

<a name="SearchPanel+onEnterClickHandler"></a>

### searchPanel.onEnterClickHandler
Обработчик нажатия Enter

**Kind**: instance property of [<code>SearchPanel</code>](#SearchPanel)  

| Param | Description |
| --- | --- |
| e | event объект |

<a name="SearchPanel+render"></a>

### searchPanel.render
рендер шаблона поиска

**Kind**: instance property of [<code>SearchPanel</code>](#SearchPanel)  
<a name="SearchPanel+init"></a>

### searchPanel.init ⇒ <code>Promise.&lt;void&gt;</code>
Иницилизация модуля

**Kind**: instance property of [<code>SearchPanel</code>](#SearchPanel)  
