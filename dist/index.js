"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupSort = groupSort;
Object.defineProperty(exports, "Event", {
  enumerable: true,
  get: function get() {
    return _event.default;
  }
});
Object.defineProperty(exports, "Formula", {
  enumerable: true,
  get: function get() {
    return _formula.default;
  }
});
Object.defineProperty(exports, "Explain", {
  enumerable: true,
  get: function get() {
    return _explain.default;
  }
});
Object.defineProperty(exports, "Collection", {
  enumerable: true,
  get: function get() {
    return _collection.default;
  }
});
Object.defineProperty(exports, "Statis", {
  enumerable: true,
  get: function get() {
    return _statis.default;
  }
});
Object.defineProperty(exports, "Guide", {
  enumerable: true,
  get: function get() {
    return _guide.default;
  }
});
Object.defineProperty(exports, "Deep", {
  enumerable: true,
  get: function get() {
    return _deep.default;
  }
});
Object.defineProperty(exports, "uuid", {
  enumerable: true,
  get: function get() {
    return _uuid2.default;
  }
});

var _event = _interopRequireDefault(require("./event"));

var _formula = _interopRequireDefault(require("./formula"));

var _explain = _interopRequireDefault(require("./explain"));

var _collection = _interopRequireDefault(require("./collection"));

var _statis = _interopRequireDefault(require("./statis"));

var _guide = _interopRequireDefault(require("./guide"));

var _deep = _interopRequireDefault(require("./deep"));

var _uuid2 = _interopRequireDefault(require("./uuid"));

//todo 暂存，分组排序
function groupSort(data) {
  for (var _len = arguments.length, rules = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rules[_key - 1] = arguments[_key];
  }

  if (!rules.length) {
    return data;
  }

  return data.sort(function (a, b) {
    for (var _i = 0; _i < rules.length; _i++) {
      var rule = rules[_i];

      if (rule(a, b)) {
        return rule(a, b);
      }
    }
  });
}