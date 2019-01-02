## 区间运算

### 构造函数 new Collection(conditions, logic)

| 参数 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| conditions | string\|array | 具体参照demo | - | 否 |
| logic | string = or\|and | 当conditions为数组时，logic表示数组各元素的逻辑关系 | or | 否 |

```js
//当conditions为字符串时，形式为：(1, 2) | [2, 3] & (3, 5]...,
//其中“()”号表示开区间，“[]”表示闭区间，“|”表示或，“&”表示且
new Collection(txt);

// 当conditions为数组时，形式为['(1, 2)', '[2, 5)', ...]
// 逻辑关系通过构造函数的第2个参数指定，默认为或的关系
// logic参数为and或or
new Collection(arr, 'and');
```

### 并集 collection.and(c1, c2, ...)

| 参数 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| ...conditions | array | 区间数组 | - | 是 |

```js
collection.and('(1, 5)', '[3, 8)', ...).and('[10, 20)')...
```

### 交集 collection.or(c1, c2, ...)

| 参数 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| ...conditions | array | 区间数组 | - | 是 |

```js
collection.or('(1, 5)', '[3, 8)', ...).or('[10, 20)')...
```

### 输出结果 collection.output()

```js
collection.output();
```