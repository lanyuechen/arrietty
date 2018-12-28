## arrietty —— js小工具合集

使用方式：
```shell
npm install arrietty  # 安装工具包
```

```js
import { Event } from 'arrietty';  //导入模块
```

目录
1. [Event](#Event) —— 自定义事件对象
2. [Formula](#Formula) —— 四则运算解析
3. [Explain](#Explain) —— 复杂函数解析
4. [Collection](#Collection) —— 区间运算
5. [Deep](#Deep) —— JS对象深度操作

### Event

使用方式
```js
import { Event } from 'arrietty';

//注册事件
Event.on('some-event', (...params) => {
  //事件处理...
});

//注册事件，触发后，只执行一次
Event.onOnce('some-event', (...params) => {
  //事件处理...
});

//注销事件
Event.off('some-event', handler);

//触发事件
Event.emit('some-event', ...params);
```

### Formula
[详情](src/formula/readme.md)

```js
import { Formula } from 'arrietty';

//返回后序表达式：[1, 2, +, 3, 4, +, *, 5, +]
Formula.parse('(1 + 2) * (3 + 4) + 5');

//返回计算结果：26
Formula.calc('(1 + 2) * (3 + 4) + 5');
```

### Explain
[详情](src/explain/readme.md)

### Collection
[详情](src/collection/readme.md)

### Deep

```js
//合并两个对象，返回新对象
Deep.merge(a, b);
//比较两个对象，返回布尔值
Deep.compare(a, b);
```

to be continue...
