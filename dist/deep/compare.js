"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepCompare;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function deepCompare(a, b) {
  if ((0, _typeof2.default)(a) !== (0, _typeof2.default)(b)) {
    return false;
  }

  if ((0, _typeof2.default)(a) === 'object') {
    if (!a || !b) {
      return a === b;
    }

    if (Array.isArray(a) ^ Array.isArray(b)) {
      return false;
    }

    var keysA = Object.keys(a);
    var keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (var _i = 0; _i < keysA.length; _i++) {
      var k = keysA[_i];

      if (!deepCompare(a[k], b[k])) {
        return false;
      }
    }
  } else {
    return a === b;
  }

  return true;
}