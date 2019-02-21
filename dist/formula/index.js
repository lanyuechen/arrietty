"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Formula =
/*#__PURE__*/
function () {
  function Formula() {
    (0, _classCallCheck2.default)(this, Formula);
  }

  (0, _createClass2.default)(Formula, null, [{
    key: "isOperator",
    value: function isOperator(char) {
      return ['+', '-', '*', '/', '(', ')'].indexOf(char) > -1;
    }
  }, {
    key: "pri",
    value: function pri(a, b) {
      if (typeof a === 'undefined') {
        return false;
      }

      var operator = ['()', '*/', '+-'];
      return operator.findIndex(function (d) {
        return d.indexOf(a) > -1;
      }) - operator.findIndex(function (d) {
        return d.indexOf(b) > -1;
      }) <= 0;
    }
  }, {
    key: "parse",
    value: function parse(formula) {
      var stack = [],
          list = [];
      formula = formula.replace(/ /g, ''); //去除空格

      var operand = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = formula[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var c = _step.value;

          if (Formula.isOperator(c)) {
            if (operand) {
              list.push(operand);
              operand = '';
            }

            if (c === '(') {
              stack.push(c);
            } else if (c === ')') {
              var s = stack.pop();

              while (typeof s !== 'undefined' && s !== '(') {
                list.push(s);
                s = stack.pop();
              }
            } else {
              var _s = stack[stack.length - 1];

              if (_s === '(') {
                stack.push(c);
              } else {
                if (Formula.pri(_s, c)) {
                  _s = stack.pop();

                  while (Formula.pri(_s, c) && _s !== '(') {
                    list.push(_s);
                    _s = stack.pop();
                  }

                  stack.push(c);
                } else {
                  stack.push(c);
                }
              }
            }
          } else {
            //操作数,暂存,继续寻找下一个
            operand += c;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (operand) {
        list.push(operand);
      }

      if (stack.length) {
        list.push.apply(list, (0, _toConsumableArray2.default)(stack.reverse().filter(function (d) {
          return d !== '(';
        })));
      }

      return list;
    }
  }, {
    key: "calc",
    value: function calc(formula) {
      if (typeof formula === 'string') {
        formula = Formula.parse(formula);
      }

      var stack = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = formula[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var c = _step2.value;

          if (Formula.isOperator(c)) {
            var b = stack.pop();
            var a = stack.pop();
            stack.push(eval("(".concat(a).concat(c).concat(b, ")")));
          } else {
            stack.push(c);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return stack[0];
    }
  }]);
  return Formula;
}();

exports.default = Formula;