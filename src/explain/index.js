export default class Explain {
  static splitParam(txt, mark = ',') {
    let start = 0, params = [], end, brackets = 0;
    for (end = start; end < txt.length; end ++) {
      txt[end] === '(' && brackets++;
      txt[end] === ')' && brackets--;
      if (brackets === 0 && txt[end] === mark) {
        params.push(txt.substring(start, end));
        start = end + 1;
      }
    }
    params.push(txt.substring(start, end));
    return params;
  }

  constructor(spec) {
    this.SPEC = spec;
  }

  parse(txt, props) {
    txt = txt.replace(/ /g, '');
    return this._parse(txt, props);
  }

  _parse(txt, props) {
    const match = txt.match(/([\$\w]+)\(/);
    if (!match) {
      return txt;
    }
  
    const start = match.index + match[0].length;
    let end, brackets = 0;
    for (end = start; end < txt.length; end ++) {
      txt[end] === '(' && brackets++;
      txt[end] === ')' && brackets--;
      if (brackets < 0) {
        break;
      }
    }
  
    const leftTxt = txt.substring(0, match.index);
    const subTxt = this.parseFunc(match[1], this.parse(txt.substring(start, end), props), props);
    const rightTxt = this.parse(txt.substring(end + 1), props);
  
    return `${leftTxt}(${subTxt})${rightTxt}`.replace(/[\n\s]+/g, ' ');
  }

  parseFunc(func, param, props) {
    func = func.toLowerCase();
  
    for (let f of this.SPEC) {
      if ((Array.isArray(f.test) && f.test.indexOf(func) > -1) ||
        (f.test instanceof RegExp && f.test.test(func)) ||
        (typeof(f.test) === 'string' && f.test === func)
      ) {
        if (typeof(f.func) === 'function') {
          return f.func({func, params: Explain.splitParam(param), props});
        }
        return f.func;
      }
    }
  
    return `${func}(${param})`;
  }
}