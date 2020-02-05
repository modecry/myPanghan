## Functions

<dl>
<dt><a href="#changeQuries">changeQuries(queries)</a></dt>
<dd><p>Сервис для сохраниния данных в url и local storage</p>
</dd>
<dt><a href="#saveQuery">saveQuery(name, value)</a> ⇒ <code>string</code></dt>
<dd><p>Функципя сохранения параметров в localStorage и преобразования</p>
</dd>
<dt><a href="#deleteQuery">deleteQuery(name)</a> ⇒ <code>string</code></dt>
<dd><p>Функция для удаления параметров из localStorage  и преобразования</p>
</dd>
</dl>

<a name="changeQuries"></a>

## changeQuries(queries)
Сервис для сохраниния данных в url и local storage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| queries | <code>array</code> | массив  объектов для сохраненения/изменения данных |

<a name="saveQuery"></a>

## saveQuery(name, value) ⇒ <code>string</code>
Функципя сохранения параметров в localStorage и преобразования

**Kind**: global function  
**Returns**: <code>string</code> - - строка с преобразованными данными  

| Param | Description |
| --- | --- |
| name | ключ |
| value | значение |

<a name="deleteQuery"></a>

## deleteQuery(name) ⇒ <code>string</code>
Функция для удаления параметров из localStorage  и преобразования

**Kind**: global function  
**Returns**: <code>string</code> - - возвращает пустую строку  

| Param | Description |
| --- | --- |
| name | ключ |

