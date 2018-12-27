## arrietty —— js小工具合集

### Event 自定义事件对象

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

### [Formula 四则运算解析](src/formula/readme.md)

```js
import { Formula } from 'arrietty';

//返回后序表达式：[1, 2, +, 3, 4, +, *, 5, +]
Formula.parse('(1 + 2) * (3 + 4) + 5');

//返回计算结果：26
Formula.calc('(1 + 2) * (3 + 4) + 5');
```

### [Explain 复杂函数解析](src/explain/readme.md)

### [Collection 区间运算](src/collection/readme.md)

to be continue...
