"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function deepMerge(target, source) {
  if ((0, _typeof2.default)(target) !== 'object' || (0, _typeof2.default)(source) !== 'object') {
    return source;
  }

  var keys = Object.keys(source);
  var result = Object.keys(target).reduce(function (p, n) {
    if (keys.indexOf(n) === -1) {
      p[n] = target[n];
    }

    return p;
  }, {});

  for (var _i = 0; _i < keys.length; _i++) {
    var key = keys[_i];

    if ((0, _typeof2.default)(target[key]) === 'object' && (0, _typeof2.default)(source[key]) === 'object') {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}