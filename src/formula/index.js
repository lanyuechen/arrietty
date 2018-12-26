/**
 * 四则运算解析
 * 解析规则
 * 1. 首先，需要分配1个栈和1个线性表，栈s用于临时存储运算符，此运算符在栈内遵循越往栈顶优先级越高的原则；线性表l用于存储转换完成的后序表达式(逆波兰式)
 * 2. 从中缀式的算术表达式字符串左端开始逐个读取字符x，逐序进行如下步骤：
 *     1. 若x是操作数，则分析出完整的运算数，将x直接插入线性表l末端；
 *     2. 若x是运算符，则分情况讨论：
 *        1. 若x是'('，则直接压入栈s；
 *        2. 若x是')'，则将距离栈s栈顶的最近的'('之间的运算符，逐个出栈，插入线性表l末端，此时抛弃'('；
 *        3. 若x是除'('和')'外的运算符，则再分如下情况讨论：
 *            1. 若当前栈s的栈顶元素为'('，则将x直接压入栈s；
 *            2. 若当前栈s的栈顶元素不为'('，则将x与栈s的栈顶元素比较：
 *                1. 栈s栈顶运算符优先级小于x的优先级，则将x直接压入栈s；
 *                2. 否则，将栈s的栈顶运算符弹出，插入线性表l末端，直到栈s的栈顶运算符优先级别低于（不包括等于）x的优先级，或输入的运算符为'('，此时再则将x压入栈s。
 */
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