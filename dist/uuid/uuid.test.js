"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _index = _interopRequireWildcard(require("./index"));

describe('UUID', function () {
  it('uuid length', function () {
    expect((0, _index.uuid)().length).toBe(36);
  });
  it('id24 length', function () {
    expect((0, _index.default)().length).toBe(24);
  });
  it('unique', function () {
    for (var i = 0; i < 10; i++) {
      expect((0, _index.default)() === (0, _index.default)()).toBe(false);
    }
  });
});