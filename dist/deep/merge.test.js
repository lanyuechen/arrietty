"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _merge = _interopRequireDefault(require("./merge"));

var _compare = _interopRequireDefault(require("./compare"));

function test(a, b, result) {
  it(JSON.stringify(a) + ', ' + JSON.stringify(b), function () {
    expect((0, _compare.default)((0, _merge.default)(a, b), result)).toBe(true);
  });
}

describe('deep-merge', function () {
  test({
    name: '小明'
  }, {
    name: '小红'
  }, {
    name: '小红'
  });
  test({
    name: '小明'
  }, 'haha', 'haha');
  test('haha', {
    name: '小红'
  }, {
    name: '小红'
  });
  test({
    name: '小明'
  }, {
    name: {
      age: 18
    }
  }, {
    name: {
      age: 18
    }
  });
  test({
    name: {
      age: 18,
      height: 180
    }
  }, {
    name: {
      age: 18,
      name: '小亮'
    }
  }, {
    name: {
      height: 180,
      age: 18,
      name: '小亮'
    }
  });
});