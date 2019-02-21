"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _compare = _interopRequireDefault(require("./compare"));

function test(a, b, bool) {
  it(JSON.stringify(a) + ', ' + JSON.stringify(b), function () {
    expect((0, _compare.default)(a, b)).toBe(bool);
  });
}

describe('deep-compare', function () {
  test(1, 1, true);
  test(0, 0, true);
  test(1, 2, false);
  test(0, false, false);
  test(null, null, true);
  test({}, {}, true);
  test({
    a: 1
  }, {
    a: 1
  }, true);
  test({
    a: 1,
    b: 2
  }, {
    b: 2,
    a: 1
  }, true);
  test({
    a: {
      b: 1
    }
  }, {
    a: {
      b: 1
    }
  }, true);
  test({
    a: 1
  }, {
    a: 2
  }, false);
  test({
    a: 1
  }, {
    a: 1,
    b: 2
  }, false);
  test({
    a: 1,
    b: 2
  }, {
    a: 1
  }, false);
  test({
    a: {
      b: 1
    }
  }, {
    a: {
      b: 2
    }
  }, false);
  test({
    a: 1
  }, {
    a: {
      b: 1
    }
  }, false);
  test([1, 2], {
    1: 1,
    2: 2
  }, false);
  test({
    0: 1,
    1: 2
  }, [1, 2], false);
});