### 复杂函数解析

- 基础四则运算不进行解析,直接返回
- 未定义函数不进行解析,直接返回
- 函数根据定义的解析模板进行解析,支持复杂结构解析,如嵌套,优先级等
- 返回的解析字符串会合并多余的空格,去除换行

#### 模板定义

- test可以是 字符串, 数组, 正则式
- func为函数(参数包含func, params, props)或字符串
    - func[string]: 函数名称
    - params[array]: 函数参数数组
    - props[object]: 额外参数对象
- 解析按数组顺序进行,匹配到立刻返回,不会再执行后面的匹配
- 解析返回字符串,不能包含需要解析的函数,例如:如果count()需要被解析,那么所有函数的解析都不得包含count()

```
[
    {test: 'sum', func: ({ params }) => params.join('+')},
    {test: 'year', func: `to_char(CURRENT_TIMESTAMP, 'YYYY')`},
    {test: /^\$\w+$/, func: ({ func, params, props }) => `select _${func}(${params[0]}) from ${props.table}`},
    {test: ['max', 'min'], func: ({ func, params }) => Math[func](...params)},
    ...
]
```

#### 使用方法

```
const explain = new Explain(SPEC);

explain.parse('sum(a, b) * 2')

>> (a + b) * 2

explain.parse('sum(a, sum(b, c))', {...otherProperties})

>> a + (b + c)
```