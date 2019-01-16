import Statis from './index';

describe('Statis', () => {
  it('默认计算公式', async () => {
    const data = await new Statis({
      data: [
        {key: '2014年', value: [10, 100]},
        {key: '2015年', value: [12, 125]},
      ],
      extra: [
        {key: '2013年', value: [7, 90]},
        {key: '2014年', value: [10, 100]},
      ],
      keyMap: 'YYYY年:1y'
    }).calc();
    expect(data[1].value[1]).toBe(0.25);
  });
  it('自定义计算公式', async () => {
    const data = await new Statis({
      data: [
        {key: '2014年', value: [10, 100]},
        {key: '2015年', value: [12, 125]},
      ],
      extra: [
        {key: '2013年', value: [7, 90]},
        {key: '2014年', value: [10, 100]},
      ],
      keyMap: 'YYYY年:1y',
      formula: (a, b) => a - b
    }).calc();
    expect(data[1].value[1]).toBe(25);
  });
  it('自定义keyMap,自定义计算公式', async () => {
    const data = await new Statis({
      data: [
        {key: '2014年', value: [10, 100]},
        {key: '2015年', value: [12, 125]},
      ],
      extra: [
        {key: '2013年', value: [7, 90]},
        {key: '2014年', value: [10, 100]},
      ],
      keyMap: key => {
        return {
          '2014年': '2014年',   //这里故意指定错误映射，用于测试该属性的可用性
          '2015年': '2013年'
        }[key];
      },
      formula: (a, b) => a - b
    }).calc();
    expect(data[1].value[0]).toBe(5);
  });
  it('key值为非时间字段，extra为Promise', async () => {
    const data = await new Statis({
      data: [
        {key: '河北', value: [10, 90]},
        {key: '山东', value: [12, 125]},
      ],
      extra: Promise.resolve([
        {key: '河北', value: [7, 100]},
        {key: '山东', value: [10, 100]},
      ]),
      keyMap: ':1y'
    }).calc();
    expect(data[0].value[1]).toBe(-0.1);
  })
});