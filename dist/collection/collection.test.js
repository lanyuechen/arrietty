"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("./index"));

describe('Collection', function () {
  it('new collection by array', function () {
    expect(new _index.default(['[0, 5]']).and('(2, 10]').output().join('|')).toBe('(2, 5]');
    expect(new _index.default().and('[1, 5]', '[5, 10]').output().join('|')).toBe('[5, 5]');
    expect(new _index.default().or('[1, 5)', '[5, 10]').output().join('|')).toBe('[1, 10]');
    expect(new _index.default().or('[.1, 1.2)', '(-.5, 10.1]').output().join('|')).toBe('(-0.5, 10.1]');
    expect(new _index.default().or('[1,2]', '[3, 4]').output().join('|')).toBe('[1, 2]|[3, 4]');
  });
  it('new collection by string', function () {
    expect(new _index.default("[1, 2] | [3, 4]").output().join('|')).toBe('[1, 2]|[3, 4]');
  });
});