import moment from 'moment';

export default class Statis {
  constructor({data, extra, keyMap, formula}) {
    this.data = data;
    this.extra = extra;

    this.formula = formula || function(a, b) {return (a - b) / b};
    if (typeof(keyMap) === 'function') {
      this.keyMap = keyMap;
    } else {
      const [, f, n, d] = keyMap.match(/(.*):(-?\d+)(\w+)/);  //格式化字符串；数量；日期标识
      this.keyMap = key => f ? moment(key, f).subtract(n, d).format(f) : key;
    }
  }

  async calc() {
    const extra = await this.extra;
    const dMap = extra.reduce((p, n) => {
      p[n.key] = n.value;
      return p;
    }, {});

    return this.data.map(d => {
      const value = dMap[this.keyMap(d.key)] || [];
      return {
        ...d,
        value: d.value.map((v, i) => this.formula(v, value[i]))
      }
    });
  }
}