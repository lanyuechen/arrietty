"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var EVENT_INSTANCE = Symbol.for('event-instance');

var CustomEvent =
/*#__PURE__*/
function () {
  function CustomEvent() {
    (0, _classCallCheck2.default)(this, CustomEvent);
    Object.defineProperty(this, 'handles', {
      value: {},
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  (0, _createClass2.default)(CustomEvent, [{
    key: "on",
    value: function on(name, cb) {
      if (!this.handles[name]) {
        this.handles[name] = [];
      }

      this.handles[name].push(cb);
      return this;
    }
  }, {
    key: "onOnce",
    value: function onOnce(name, cb) {
      var _this = this;

      var fn = function fn() {
        cb.apply(void 0, arguments);

        _this.off(name, fn);
      };

      this.on(name, fn);
    }
  }, {
    key: "emit",
    value: function emit(name) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (!this.handles[name]) {
        return;
      }

      this.handles[name].map(function (cb) {
        cb.apply(void 0, params);
      });
    }
  }, {
    key: "off",
    value: function off(name, handle) {
      if (!this.handles[name]) {
        return;
      }

      this.handles[name] = this.handles[name].filter(function (cb) {
        return cb !== handle;
      });

      if (this.handles[name].length === 0) {
        delete this.handles[name];
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!window[EVENT_INSTANCE]) {
        window[EVENT_INSTANCE] = new CustomEvent();
      }

      return window[EVENT_INSTANCE];
    }
  }]);
  return CustomEvent;
}();

var _default = CustomEvent.getInstance();

exports.default = _default;