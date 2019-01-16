## 统计计算 Statis

### 构造函数 new Statis(args)

| 参数 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| data | array of [Data](#Data) | 待计算的数据 | - | 是 |
| extra | Promise \| array of [Data](#Data) | 用于对比计算的数据 | - | 是 |
| [keyMap](KeyMap) | string \| function | 数据映射关系，包括同/环比类型 | - | 是 |
| formula | function | 计算函数 | funciton(a, b) {return (a - b) / b} | 否 |

#### Data

| 属性 | 类型 | 描述 | 默认值 | 是否必须 |
|----|----|----|----|----|
| key | string | 维度key | - | 是 |
| value | array | 数值数组 | - | 是 |

#### KeyMap

- 当keyMap为string时：
  keyMap的格式为`${format}:${n}${t}`，其中format可以为空，表示时间格式，n、t必须存在，表示同/环比粒度，n取负值表示反向同/环比
  - 当data中各个数据的key值表示时间字段时，format不能为空，表示日期字段的格式，例如：YYYY年
  - 当data中各个数据的key值表示与时间无关的字段时，format必须为空

- 当keyMap为function时：
  keyMap参数为data中各个数据的key值，返回值为extra中各个数据的key值

### 计算同/环比 statis.calc()

返回Promise

### 例子

```js
import Statis from './index';

// key值为时间字段，自定义计算方法
new Statis({
  data: [
    {key: '2014年', value: [10, 100]},
    {key: '2015年', value: [12, 125]},
  ],
  extra: [
    {key: '2013年', value: [7, 90]},
    {key: '2014年', value: [10, 100]},
  ],
  keyMap: 'YYYY年:1y',
  formula: function(a, b) {
    return (a - b) / b + 10;  
  }
}).calc();

//key值为非时间字段，extra为Promise
new Statis({
  data: [
    {key: '河北', value: [10, 100]},
    {key: '山东', value: [12, 125]},
  ],
  extra: Promise.resolve([
    {key: '河北', value: [7, 90]},
    {key: '山东', value: [10, 100]},
  ]),
  keyMap: ':1y'
}).calc();

//keyMap为函数
new Statis({
  data: [
    {key: '石家庄', value: [10, 100]},
    {key: '济南', value: [12, 125]},
  ],
  extra: [
    {key: '河北', value: [7, 90]},
    {key: '山东', value: [10, 100]},
  ],
  keyMap: function(key) {
    return {
      '石家庄': '河北',
      '济南': '山东'  
    }[key];
  }
}).calc();
```