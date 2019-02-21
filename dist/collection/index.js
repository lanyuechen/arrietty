"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Collection =
/*#__PURE__*/
function () {
  /**
   * 构造函数
   * @param {string|array} conditions 区间描述
   *   当conditions为字符串时，形式为：(1, 2) | [2, 3] & (3, 5]...,
   *     其中“()”号表示开区间，“[]”表示闭区间，“|”表示或，“&”表示且
   *   当conditions为数组时，形式为['(1, 2)', '[2, 5)', ...]
   *     逻辑关系通过构造函数的第2个参数指定，默认为或的关系
   * @param {string(or|and)} logic 默认为or，只有conditions为数组时有效
   */
  function Collection(conditions) {
    var _this = this;

    var logic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'or';
    (0, _classCallCheck2.default)(this, Collection);

    if (typeof conditions === 'string') {
      conditions.split('&').map(function (d) {
        _this.or.apply(_this, (0, _toConsumableArray2.default)(new Collection(d.split('|')).output()));
      });
    } else if (Array.isArray(conditions)) {
      conditions.map(function (d) {
        return _this[logic](d);
      });
    }
  }

  (0, _createClass2.default)(Collection, [{
    key: "or",
    value: function or() {
      for (var _len = arguments.length, conditions = new Array(_len), _key = 0; _key < _len; _key++) {
        conditions[_key] = arguments[_key];
      }

      conditions = conditions.map(function (d) {
        return Collection.parseCondition(d);
      });
      this.conditions = this.conditions || [];
      this.conditions = Collection.or.apply(Collection, (0, _toConsumableArray2.default)(this.conditions).concat((0, _toConsumableArray2.default)(conditions)));
      return this;
    }
  }, {
    key: "and",
    value: function and() {
      for (var _len2 = arguments.length, conditions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        conditions[_key2] = arguments[_key2];
      }

      conditions = conditions.map(function (d) {
        return Collection.parseCondition(d);
      });
      this.conditions = this.conditions || [[-Infinity, Infinity]];
      this.conditions = this.conditions.map(function (d) {
        return conditions.reduce(function (p, n) {
          return p && Collection.and(p, n);
        }, d);
      }).filter(function (d) {
        return d;
      });
      return this;
    }
  }, {
    key: "output",
    value: function output() {
      return this.conditions.map(function (d) {
        return "".concat(d[0].close ? '[' : '(').concat(d[0], ", ").concat(d[1]).concat(d[1].close ? ']' : ')');
      });
    }
  }], [{
    key: "cross",
    value: function cross(a, b, or) {
      return !(a[0] > b[1] || a[1] < b[0] || a[0].valueOf() == b[1] && !Collection.crossDot(a[0], b[1], or) || a[1].valueOf() == b[0] && !Collection.crossDot(a[1], b[0], or));
    }
  }, {
    key: "crossDot",
    value: function crossDot(a, b, or) {
      return or ? a.close || b.close : a.close && b.close;
    }
  }, {
    key: "or",
    value: function or() {
      for (var _len3 = arguments.length, conditions = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        conditions[_key3] = arguments[_key3];
      }

      if (!conditions.length) {
        return [];
      }

      var a = conditions.shift();
      var idx = conditions.findIndex(function (d) {
        return Collection.cross(a, d, true);
      });

      if (idx > -1) {
        var b = conditions.splice(idx, 1)[0];
        var vs = [].concat((0, _toConsumableArray2.default)(a), (0, _toConsumableArray2.default)(b)).sort(function (v1, v2) {
          return v1 - v2;
        });
        return Collection.or.apply(Collection, [[vs[0], vs[3]]].concat(conditions));
      } else {
        return [a].concat((0, _toConsumableArray2.default)(Collection.or.apply(Collection, conditions)));
      }
    }
  }, {
    key: "and",
    value: function and(a, b) {
      if (!Collection.cross(a, b)) {
        return null;
      }

      var vs = [].concat((0, _toConsumableArray2.default)(a), (0, _toConsumableArray2.default)(b)).sort(function (v1, v2) {
        return v1 - v2;
      });
      var res = [vs[1], vs[2]]; //  console.log('res', res)

      return res;
    }
  }, {
    key: "parseCondition",
    value: function parseCondition(txt) {
      txt = txt.replace(/ /g, '');
      var m = txt.match(/([\[\(])(-?\d*\.?\d+),(-?\d*\.?\d+)([\]\)])/);

      if (!m) {
        console.error('不合法的区间：', txt);
      }

      var left = new Number(m[2]);
      var right = new Number(m[3]);
      left.close = m[1] === '[';
      right.close = m[4] === ']';
      return [left, right];
    }
  }]);
  return Collection;
}();

exports.default = Collection;