## 复杂函数解析

- 基础四则运算不进行解析,直接返回
- 未定义函数不进行解析,直接返回
- 函数根据定义的解析模板进行解析,支持复杂结构解析,如嵌套,优先级等
- 返回的解析字符串会合并多余的空格,去除换行

### 构造函数 new Explain(spec)

| 参数 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| spec | array of [Spec](#Spec) | 解析模板数组 | - | 是 |

#### Spec

| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| test | string\|array\|regexp | 用户定义需要匹配的函数名称 | - | 否 |
| func | function | 对匹配到的函数的处理函数 | - | 是 |

- test可以是 字符串, 数组, 正则式
- func为函数(参数包含func, params, props)或字符串
    - func[string]: 函数名称
    - params[array]: 函数参数数组
    - props[object]: 额外参数对象
- 解析按数组顺序进行,匹配到立刻返回,不会再执行后面的匹配
- 解析返回字符串,不能包含需要解析的函数,例如:如果count()需要被解析,那么所有函数的解析都不得包含count()

```js
const spec = [
    {test: 'sum', func: ({ params }) => params.join('+')},
    {test: 'year', func: `to_char(CURRENT_TIMESTAMP, 'YYYY')`},
    {test: /^\$\w+$/, func: ({ func, params, props }) => `select _${func}(${params[0]}) from ${props.table}`},
    {test: ['max', 'min'], func: ({ func, params }) => Math[func](...params)},
    ...
];
const explain = new Explain(spec);
```

### explain.parse(txt) 解析函数字符串

| 参数 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| txt | string | 待解析的函数字符串 | - | 是 |

### 使用方法

```js
//>> (a + b) * 2
explain.parse('sum(a, b) * 2');

//>> a + (b + c)
explain.parse('sum(a, sum(b, c))', {...otherProperties});
```