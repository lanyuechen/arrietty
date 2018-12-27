export default class Collection {
   /**
    * 构造函数
    * @param {string|array} conditions 区间描述
    *   当conditions为字符串时，形式为：(1, 2) | [2, 3] & (3, 5]...,
    *     其中“()”号表示开区间，“[]”表示闭区间，“|”表示或，“&”表示且
    *   当conditions为数组时，形式为['(1, 2)', '[2, 5)', ...]
    *     逻辑关系通过构造函数的第2个参数指定，默认为或的关系
    * @param {string(or|and)} logic 默认为or，只有conditions为数组时有效
    */
   constructor(conditions, logic = 'or') {
      if (typeof(conditions) === 'string') {
         conditions.split('&').map(d => {
            this.or(...new Collection(d.split('|')).output());
         });
      } else if (Array.isArray(conditions)) {
         conditions.map(d => this[logic](d));
      }
   }

  static cross(a, b, or) {
     return !(
        (a[0] > b[1] || a[1] < b[0]) ||
        (a[0].valueOf() == b[1] && !Collection.crossDot(a[0], b[1], or)) ||
        (a[1].valueOf() == b[0] && !Collection.crossDot(a[1], b[0], or))
     );
  }
  
  static crossDot(a, b, or) {
     return or ? a.close || b.close : a.close && b.close;
  }
  
  static or(...conditions) {
     if (!conditions.length) {
        return [];
     }
     const a = conditions.shift();
     const idx = conditions.findIndex(d => Collection.cross(a, d, true));
     if (idx > -1) {
        const b = conditions.splice(idx, 1)[0];
        const vs = [...a, ...b].sort((v1, v2) => v1 - v2);
        return Collection.or([ vs[0], vs[3] ], ...conditions);
     } else {
        return [ a, ...Collection.or(...conditions) ];
     }
  }
  
  static and(a, b) {
     if (!Collection.cross(a, b)) {
        return null;
     }
     const vs = [...a, ...b].sort((v1, v2) => v1 - v2);
     
     const res = [ vs[1], vs[2] ];
    //  console.log('res', res)
     return res;
  }
  
  static parseCondition(txt) {
     txt = txt.replace(/ /g, '');
     const m = txt.match(/([\[\(])(-?\d*\.?\d+),(-?\d*\.?\d+)([\]\)])/);
     if (!m) {
        console.error('不合法的区间：', txt);
     }
     const left = new Number(m[2]);
     const right = new Number(m[3]);
     left.close = m[1] === '[';
     right.close = m[4] === ']';
     return [ left, right ];
  }
  
  or(...conditions) {
     conditions = conditions.map(d => Collection.parseCondition(d));
     this.conditions = this.conditions || [];
     this.conditions = Collection.or(...this.conditions, ...conditions);
     return this;      
  }
  
  and(...conditions) {
     conditions = conditions.map(d => Collection.parseCondition(d));
     this.conditions = this.conditions || [[ -Infinity, Infinity ]];
     this.conditions = this.conditions.map(d => {
        return conditions.reduce((p, n) => {
           return p && Collection.and(p, n);
        }, d);
     }).filter(d => d);
     return this;
  }
  
  output() {
     return this.conditions.map(d => `${d[0].close ? '[' : '('}${d[0]}, ${d[1]}${d[1].close ? ']' : ')'}`);
  }
}