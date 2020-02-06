<a name="BlockContent"></a>

## BlockContent
Класс реализущий вывод основных блоков с контентом на основе данных

**Kind**: global class  

* [BlockContent](#BlockContent)
    * [.applyFilters](#BlockContent+applyFilters)
    * [.toggleVisible](#BlockContent+toggleVisible)
    * [.renderBlock](#BlockContent+renderBlock) ⇒ <code>string</code>
    * [.renderBlocksContent](#BlockContent+renderBlocksContent)
    * [.init](#BlockContent+init)

<a name="BlockContent+applyFilters"></a>

### blockContent.applyFilters
Метод применения фильтров и поиска

**Kind**: instance property of [<code>BlockContent</code>](#BlockContent)  
<a name="BlockContent+toggleVisible"></a>

### blockContent.toggleVisible
Скрывает/ Показывает блоки в зависимости от массива идентификаторов

**Kind**: instance property of [<code>BlockContent</code>](#BlockContent)  
<a name="BlockContent+renderBlock"></a>

### blockContent.renderBlock ⇒ <code>string</code>
Метод рендера 1 экземпляра блока с контентом

**Kind**: instance property of [<code>BlockContent</code>](#BlockContent)  
**Returns**: <code>string</code> - - строка с DOM элементом  

| Param | Description |
| --- | --- |
| name | имя |
| whatsapp | никнейм ватсап |
| telegram | никнейм телега |
| instagram | никнейм инстаграм |
| facebook | никнейм фейсбук |
| service | название услуги |
| description | заголовок услуги |
| id | id для data атрибута |

<a name="BlockContent+renderBlocksContent"></a>

### blockContent.renderBlocksContent
Рендер блоков на основе данных

**Kind**: instance property of [<code>BlockContent</code>](#BlockContent)  
<a name="BlockContent+init"></a>

### blockContent.init
Иницилизация блока

**Kind**: instance property of [<code>BlockContent</code>](#BlockContent)  
