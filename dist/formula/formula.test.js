"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

describe('Formula', function () {
  it('transform', function () {
    expect(_index.default.parse('1 + 2 + 3').join(', ')).toBe('1, 2, +, 3, +');
    expect(_index.default.parse('1 + (2 + 3)').join(', ')).toBe('1, 2, 3, +, +');
    expect(_index.default.parse('1 * 2 + 3').join(', ')).toBe('1, 2, *, 3, +');
    expect(_index.default.parse('1 * (2 + 3)').join(', ')).toBe('1, 2, 3, +, *');
    expect(_index.default.parse('(1 + 2) * (3 + 4) + 5').join(', ')).toBe('1, 2, +, 3, 4, +, *, 5, +');
    expect(_index.default.parse('1 + (2 + (3 + (4 + 5))').join(', ')).toBe('1, 2, 3, 4, 5, +, +, +, +');
  });
  it('calc', function () {
    expect(_index.default.calc('1 + 2 + 3')).toBe(6);
    expect(_index.default.calc('1 + (2 + 3)')).toBe(6);
    expect(_index.default.calc('1 * 2 + 3')).toBe(5);
    expect(_index.default.calc('1 * (2 + 3)')).toBe(5);
    expect(_index.default.calc('(1 + 2) * (3 + 4) + 5')).toBe(26);
    expect(_index.default.calc('1 + (2 + (3 + (4 + 5))')).toBe(15);
  });
});