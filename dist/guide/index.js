"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

require("./style.css");

var GUIDE = Symbol('guide');

var Guide =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(Guide, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!window[GUIDE]) {
        window[GUIDE] = new Guide();
      }

      return window[GUIDE];
    }
  }]);

  function Guide() {
    var _this = this;

    (0, _classCallCheck2.default)(this, Guide);
    this.interval = setInterval(function () {
      console.log('user guide ...');

      _this.loop();
    }, 2000);
  }

  (0, _createClass2.default)(Guide, [{
    key: "getSpec",
    value: function getSpec() {
      if (!this.spec && localStorage.spec) {
        this.spec = JSON.parse(localStorage.spec);
      }

      return this.spec;
    }
    /**
     * 为dom注册标记,并保存到引导文档中
     * @param dom 被标记的dom
     * @param step 此步骤为第几步
     */

  }, {
    key: "register",
    value: function register(dom, step) {
      var spec = this.getSpec();

      if (!spec || !spec[step]) {
        //如果没有spec或如果注册的引导不存在,则不进入新用户引导
        return;
      }

      spec[step].id = "k".concat(new Date().getTime()).concat(parseInt(Math.random() * 1000000));
      dom.setAttribute('data-id', spec[step].id);
    }
  }, {
    key: "loop",
    value: function loop() {
      var spec = this.getSpec();

      if (!spec) {
        return;
      }

      for (var i = 0; i < spec.length; i++) {
        var s = spec[i];

        if (!s || s.after && !isNaN(s.after.find(function (step) {
          return spec[step];
        }))) {
          continue;
        }

        this.render(i);
      }
    }
    /**
     * 渲染遮罩,提示等元素
     * @param step 步骤编号
     */

  }, {
    key: "render",
    value: function render(step) {
      var _this2 = this;

      var option = this.spec[step];
      var dom = document.querySelector("[data-id=".concat(option.id, "]")); //通过parentNode定位父dom

      if (dom && option.path) {
        option.path.split('.').map(function (k) {
          dom = dom[k];
        });
      }

      this.clear(step);

      if (!dom) {
        return;
      }

      var rect = dom.getBoundingClientRect(); //高亮显示区域

      var mask = document.createElement('div');
      mask.className = 'guide-mask';

      if (option.trigger === 'forbidden') {
        mask.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      } else if (option.trigger === 'manual') {
        mask.style.pointerEvents = 'none';
      } else {
        mask.addEventListener('click', function () {
          dom.click();

          _this2.finish(step);
        });
      } //遮罩显示区域


      var maskBg;

      if (!option.noMask) {
        maskBg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        maskBg.setAttribute('class', 'guide-mask-bg');
        var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', "\n        0,0 0,99999 99999,99999, 99999,0 0,0\n        ".concat(rect.left, ",").concat(rect.top, " ").concat(rect.right, ",").concat(rect.top, "\n        ").concat(rect.right, ",").concat(rect.bottom, " ").concat(rect.left, ",").concat(rect.bottom, "\n        ").concat(rect.left, ",").concat(rect.top, "\n      "));
        var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', "\n        ".concat(rect.left, ",").concat(rect.top, " ").concat(rect.right, ",").concat(rect.top, "\n        ").concat(rect.right, ",").concat(rect.bottom, " ").concat(rect.left, ",").concat(rect.bottom, "\n        ").concat(rect.left, ",").concat(rect.top, "\n      "));
        polygon.addEventListener('click', function (e) {
          e.stopPropagation();
          e.preventDefault();
        });
        maskBg.appendChild(polygon);
        maskBg.appendChild(polyline);
        document.body.appendChild(maskBg);
      }

      var tooltip;

      if (option.tip) {
        tooltip = this.tip(step, option, rect);
        document.body.appendChild(tooltip);
      }

      this.spec[step] = (0, _objectSpread2.default)({}, option, {
        dom: dom,
        mask: mask,
        tooltip: tooltip,
        maskBg: maskBg
      });
      dom.appendChild(mask);
    }
  }, {
    key: "finish",
    value: function finish(step) {
      this.clear(step);
      this.spec && (this.spec[step] = null);

      if (!this.spec || !this.spec.find(function (d) {
        return d;
      })) {
        this.destroy();
        return;
      }

      var spec = this.spec.map(function (d) {
        return d && {
          id: d.id,
          tip: d.tip,
          trigger: d.trigger,
          after: d.after,
          path: d.path,
          position: d.position,
          next: d.next,
          finish: d.finish,
          noSkip: d.noSkip,
          noMask: d.noMask,
          type: d.type
        };
      });
      localStorage.setItem('spec', JSON.stringify(spec));
      this.loop(); //当结束某步骤后立即轮询一次,定位到下一步
    }
  }, {
    key: "clear",
    value: function clear(step) {
      var item = this.spec && this.spec[step];

      if (!item) {
        return;
      } //清除mask


      item.mask && item.dom.removeChild(item.mask);
      item.maskBg && document.body.removeChild(item.maskBg); //清除tip

      item.tooltip && document.body.removeChild(item.tooltip); //清除数据中保存的dom对象

      item.dom = null;
      item.mask = null;
      item.maskBg = null;
      item.tooltip = null;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      clearInterval(this.interval);
      delete this.interval;
      delete this.spec;
      delete localStorage.spec;
    }
  }, {
    key: "setPosition",
    value: function setPosition(dom, rect, position) {
      if (position === 'left') {
        dom.style.cssText = "\n        left: ".concat(rect.left - 210, "px;\n        top: ").concat((rect.top + rect.bottom) / 2 - 40, "px;\n      ");
      } else if (position === 'bottom') {
        dom.style.cssText = "\n        left: ".concat((rect.left + rect.right) / 2 - 100, "px;\n        top: ").concat(rect.bottom + 10, "px;\n      ");
      } else if (position === 'bottom-left') {
        dom.style.cssText = "\n        left: ".concat((rect.left + rect.right) / 2 - 200 * 0.8, "px;\n        top: ").concat(rect.bottom + 10, "px;\n      ");
      } else {
        dom.style.cssText = "\n        left: ".concat(rect.right + 10, "px;\n        top: ").concat((rect.top + rect.bottom) / 2 - 40, "px;\n      ");
      }
    }
  }, {
    key: "tipImg",
    value: function tipImg(step, option, rect) {
      var _this3 = this;

      var tip = option.tip,
          position = option.position;
      var image = document.createElement('img');
      image.className = "guide-tip guide-tip-img ".concat(position || 'right');
      image.style.pointerEvents = 'all';
      image.src = tip;
      this.setPosition(image, (0, _objectSpread2.default)({}, rect, {
        left: rect.left + 60,
        right: rect.right + 60,
        bottom: rect.bottom - 60
      }), position);
      image.style.width = '80px';
      image.addEventListener('click', function () {
        _this3.finish(step);
      });
      return image;
    }
  }, {
    key: "tip",
    value: function tip(step, option, rect) {
      var _this4 = this;

      if (option.type === 'img') {
        return this.tipImg(step, option, rect);
      }

      var tip = option.tip,
          position = option.position;
      var tooltip = document.createElement('div');
      tooltip.innerHTML = "<p>".concat(tip, "</p>");
      tooltip.className = "guide-tip ".concat(position || 'right');
      this.setPosition(tooltip, rect, position);

      if (!option.noSkip) {
        var goAway = document.createElement('a');
        goAway.className = 'guide-tip-go-away';
        goAway.innerHTML = i18n('skipGuide');
        goAway.addEventListener('click', function () {
          _this4.clear(step);

          _this4.destroy();
        });
        tooltip.appendChild(goAway);
      }

      if (option.next || option.finish) {
        var next = document.createElement('a');
        next.className = 'guide-tip-next';
        next.innerHTML = i18n('gotIt');
        next.addEventListener('click', function () {
          _this4.finish(step);
        });
        tooltip.appendChild(next);
      }

      return tooltip;
    }
  }]);
  return Guide;
}();

exports.default = Guide;