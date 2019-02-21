"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = _interopRequireDefault(require("./index"));

describe('Statis', function () {
  it('默认计算公式',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _index.default({
              data: [{
                key: '2014年',
                value: [10, 100]
              }, {
                key: '2015年',
                value: [12, 125]
              }],
              extra: [{
                key: '2013年',
                value: [7, 90]
              }, {
                key: '2014年',
                value: [10, 100]
              }],
              keyMap: 'YYYY年:1y'
            }).calc();

          case 2:
            data = _context.sent;
            expect(data[1].value[1]).toBe(0.25);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('自定义计算公式',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var data;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new _index.default({
              data: [{
                key: '2014年',
                value: [10, 100]
              }, {
                key: '2015年',
                value: [12, 125]
              }],
              extra: [{
                key: '2013年',
                value: [7, 90]
              }, {
                key: '2014年',
                value: [10, 100]
              }],
              keyMap: 'YYYY年:1y',
              formula: function formula(a, b) {
                return a - b;
              }
            }).calc();

          case 2:
            data = _context2.sent;
            expect(data[1].value[1]).toBe(25);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  it('自定义keyMap,自定义计算公式',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var data;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new _index.default({
              data: [{
                key: '2014年',
                value: [10, 100]
              }, {
                key: '2015年',
                value: [12, 125]
              }],
              extra: [{
                key: '2013年',
                value: [7, 90]
              }, {
                key: '2014年',
                value: [10, 100]
              }],
              keyMap: function keyMap(key) {
                return {
                  '2014年': '2014年',
                  //这里故意指定错误映射，用于测试该属性的可用性
                  '2015年': '2013年'
                }[key];
              },
              formula: function formula(a, b) {
                return a - b;
              }
            }).calc();

          case 2:
            data = _context3.sent;
            expect(data[1].value[0]).toBe(5);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
  it('key值为非时间字段，extra为Promise',
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4() {
    var data;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new _index.default({
              data: [{
                key: '河北',
                value: [10, 90]
              }, {
                key: '山东',
                value: [12, 125]
              }],
              extra: Promise.resolve([{
                key: '河北',
                value: [7, 100]
              }, {
                key: '山东',
                value: [10, 100]
              }]),
              keyMap: ':1y'
            }).calc();

          case 2:
            data = _context4.sent;
            expect(data[0].value[1]).toBe(-0.1);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));
});