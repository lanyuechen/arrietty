"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

var explain = new _index.default([{
  test: 'sum',
  func: function func(_ref) {
    var params = _ref.params;
    return params.join('+');
  }
}, {
  test: 'year',
  func: "to_char(CURRENT_TIMESTAMP, 'YYYY')"
}, {
  test: /^\$\w+$/,
  func: function func(_ref2) {
    var _func = _ref2.func,
        params = _ref2.params,
        props = _ref2.props;
    return "select _".concat(_func, "(").concat(params[0], ") from ").concat(props.table);
  }
}, {
  test: ['max', 'min'],
  func: function func(_ref3) {
    var _func2 = _ref3.func,
        params = _ref3.params;
    return "Math.".concat(_func2, "(").concat(params, ")");
  }
}]);
describe('Explain', function () {
  it('transform', function () {
    expect(explain.parse('1+2+3')).toBe('1+2+3');
    expect(explain.parse(' 1 +    2 +  3  ')).toBe('1+2+3');
    expect(explain.parse('sum(1,2,3)')).toBe('(1+2+3)');
    expect(explain.parse('1 + year()')).toBe("1+(to_char(CURRENT_TIMESTAMP, 'YYYY'))");
    expect(explain.parse('1 + sum(2, 3)')).toBe('1+(2+3)');
    expect(explain.parse('max(1, 2, 3)')).toBe('(Math.max(1,2,3))');
    expect(explain.parse('sum(1 * sum(2, 3), min(4, 5 + 6) * 7)')).toBe('(1*(2+3)+(Math.min(4,5+6))*7)');
    expect(explain.parse('$sum(a)', {
      table: 't1'
    })).toBe('(select _$sum(a) from t1)');
    expect(explain.parse('$sum($sum($sum(c1)))', {
      table: 't1'
    })).toBe('(select _$sum((select _$sum((select _$sum(c1) from t1)) from t1)) from t1)');
  });
});