export default class Formula {
  static isOperator(char) {
    return ['+', '-', '*', '/', '(', ')'].indexOf(char) > -1;
  }

  static pri(a, b) {
    if (typeof(a) === 'undefined') {
      return false;
    }
    const operator = ['()', '*/', '+-'];
    return operator.findIndex(d => d.indexOf(a) > -1) - operator.findIndex(d => d.indexOf(b) > -1) <= 0;
  }

  static explain(formula) {
    const stack = [], list = [];

    formula = formula.replace(/ /g, '');    //去除空格
    let operand = '';
    for(let c of formula) {
      if (Formula.isOperator(c)) {
        if (operand) {
          list.push(operand);
          operand = '';
        }

        if (c === '(') {
          stack.push(c);
        } else if (c === ')') {
          let s = stack.pop();
          while(typeof(s) !== 'undefined' && s !== '(') {
            list.push(s);
            s = stack.pop();
          }
        } else {
          let s = stack[stack.length - 1];
          if (s === '(') {
            stack.push(c);
          } else {
            if (Formula.pri(s, c)) {
              s = stack.pop();
              while(Formula.pri(s, c) && s !== '(') {
                list.push(s);
                s = stack.pop();
              }
              stack.push(c);
            } else {
              stack.push(c);
            }
          }
        }
      } else {    //操作数,暂存,继续寻找下一个
        operand += c;
      }
    }
    if (operand) {
      list.push(operand);
    }
    if (stack.length) {
      list.push(...stack.reverse().filter(d => d !== '('));
    }

    return list;
  }

  static result(formula) {
    if (typeof(formula) === 'string') {
      formula = Formula.explain(formula);
    }
    const stack = [];
    for (let c of formula) {
      if (Formula.isOperator(c)) {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(eval(`(${a}${c}${b})`));
      } else {
        stack.push(c);
      }
    }
    return stack[0];
  }
}