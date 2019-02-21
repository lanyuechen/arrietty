"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

var Statis =
/*#__PURE__*/
function () {
  function Statis(_ref) {
    var data = _ref.data,
        extra = _ref.extra,
        keyMap = _ref.keyMap,
        formula = _ref.formula;
    (0, _classCallCheck2.default)(this, Statis);
    this.data = data;
    this.extra = extra;

    this.formula = formula || function (a, b) {
      return (a - b) / b;
    };

    if (typeof keyMap === 'function') {
      this.keyMap = keyMap;
    } else {
      var _keyMap$match = keyMap.match(/(.*):(-?\d+)(\w+)/),
          _keyMap$match2 = (0, _slicedToArray2.default)(_keyMap$match, 4),
          f = _keyMap$match2[1],
          n = _keyMap$match2[2],
          d = _keyMap$match2[3]; //格式化字符串；数量；日期标识


      this.keyMap = function (key) {
        return f ? (0, _moment.default)(key, f).subtract(n, d).format(f) : key;
      };
    }
  }

  (0, _createClass2.default)(Statis, [{
    key: "calc",
    value: function () {
      var _calc = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _this = this;

        var extra, dMap;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.extra;

              case 2:
                extra = _context.sent;
                dMap = extra.reduce(function (p, n) {
                  p[n.key] = n.value;
                  return p;
                }, {});
                return _context.abrupt("return", this.data.map(function (d) {
                  var value = dMap[_this.keyMap(d.key)] || [];
                  return (0, _objectSpread2.default)({}, d, {
                    value: d.value.map(function (v, i) {
                      return _this.formula(v, value[i]);
                    })
                  });
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function calc() {
        return _calc.apply(this, arguments);
      }

      return calc;
    }()
  }]);
  return Statis;
}();

exports.default = Statis;