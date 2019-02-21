"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compare = _interopRequireDefault(require("./compare"));

var _merge = _interopRequireDefault(require("./merge"));

var _default = {
  compare: _compare.default,
  merge: _merge.default
};
exports.default = _default;