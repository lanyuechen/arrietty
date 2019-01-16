import moment from 'moment';

export default class Statis {
  constructor({data, format, extra, formula, type}) {
    this.data = data;
    this.format = format;
    this.extra = extra;
    this.formula = formula || function(a, b) {return a - b};
    this.type = type;
  }

  extraKey(key) {
    if (this.format) {
      return moment(key, this.format).subtract(1, this.type).format(this.format);
    }
    return key;
  }

  async calc() {
    const extra = await this.extra;
    const dMap = extra.reduce((p, n) => {
      p[n.key] = n.value;
      return p;
    }, {});

    return this.data.map(d => {
      const value = dMap[this.extraKey(d.key)] || [];
      return {
        ...d,
        value: d.value.map((v, i) => this.formula(v, value[i]))
      }
    });
  }
}