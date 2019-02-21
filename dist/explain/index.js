"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Explain =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(Explain, null, [{
    key: "splitParam",
    value: function splitParam(txt) {
      var mark = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ',';
      var start = 0,
          params = [],
          end,
          brackets = 0;

      for (end = start; end < txt.length; end++) {
        txt[end] === '(' && brackets++;
        txt[end] === ')' && brackets--;

        if (brackets === 0 && txt[end] === mark) {
          params.push(txt.substring(start, end));
          start = end + 1;
        }
      }

      params.push(txt.substring(start, end));
      return params;
    }
  }]);

  function Explain(spec) {
    (0, _classCallCheck2.default)(this, Explain);
    this.SPEC = spec;
  }

  (0, _createClass2.default)(Explain, [{
    key: "parse",
    value: function parse(txt, props) {
      txt = txt.replace(/ /g, '');
      return this._parse(txt, props);
    }
  }, {
    key: "_parse",
    value: function _parse(txt, props) {
      var match = txt.match(/([\$\w]+)\(/);

      if (!match) {
        return txt;
      }

      var start = match.index + match[0].length;
      var end,
          brackets = 0;

      for (end = start; end < txt.length; end++) {
        txt[end] === '(' && brackets++;
        txt[end] === ')' && brackets--;

        if (brackets < 0) {
          break;
        }
      }

      var leftTxt = txt.substring(0, match.index);
      var subTxt = this.parseFunc(match[1], this.parse(txt.substring(start, end), props), props);
      var rightTxt = this.parse(txt.substring(end + 1), props);
      return "".concat(leftTxt, "(").concat(subTxt, ")").concat(rightTxt).replace(/[\n\s]+/g, ' ');
    }
  }, {
    key: "parseFunc",
    value: function parseFunc(func, param, props) {
      func = func.toLowerCase();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.SPEC[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var f = _step.value;

          if (Array.isArray(f.test) && f.test.indexOf(func) > -1 || f.test instanceof RegExp && f.test.test(func) || typeof f.test === 'string' && f.test === func) {
            if (typeof f.func === 'function') {
              return f.func({
                func: func,
                params: Explain.splitParam(param),
                props: props
              });
            }

            return f.func;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return "".concat(func, "(").concat(param, ")");
    }
  }]);
  return Explain;
}();

exports.default = Explain;