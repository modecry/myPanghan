<a name="Categories"></a>

## Categories
Класс для формирования категорий

**Kind**: global class  

* [Categories](#Categories)
    * [.clearCategories](#Categories+clearCategories)
    * [.renderCategory](#Categories+renderCategory) ⇒ <code>string</code>
    * [.renderCategories](#Categories+renderCategories)
    * [.init](#Categories+init)
    * [.toggle(category)](#Categories+toggle) ⇒ <code>function</code>

<a name="Categories+clearCategories"></a>

### categories.clearCategories
сброс класса active

**Kind**: instance property of [<code>Categories</code>](#Categories)  
<a name="Categories+renderCategory"></a>

### categories.renderCategory ⇒ <code>string</code>
Рендер ноды категории

**Kind**: instance property of [<code>Categories</code>](#Categories)  
**Returns**: <code>string</code> - - Строка с нодой  

| Param | Description |
| --- | --- |
| text | описание |
| attr | [name] атрибут ноды |

<a name="Categories+renderCategories"></a>

### categories.renderCategories
Рендер категорий

**Kind**: instance property of [<code>Categories</code>](#Categories)  
<a name="Categories+init"></a>

### categories.init
Иницилизация категорий

**Kind**: instance property of [<code>Categories</code>](#Categories)  
<a name="Categories+toggle"></a>

### categories.toggle(category) ⇒ <code>function</code>
Замыкающий метод для обработки нажатия по категории

**Kind**: instance method of [<code>Categories</code>](#Categories)  

| Param | Description |
| --- | --- |
| category | node экземпляр для навешивания |

