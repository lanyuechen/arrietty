import spec from './spec.json';
import './style.css';

localStorage.spec = JSON.stringify(spec);

const GUIDE = Symbol.for('guide');

class Guide {
  static getInstance() {
    if (!window[GUIDE]) {
      window[GUIDE] = new Guide();
    }
    return window[GUIDE];
  }

  constructor() {
    this.interval = setTimeout(() => {
      console.log('user guide ...');
      this.loop();
    }, 2000);
  }

  getSpec() {
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
  register(dom, step) {
    const spec = this.getSpec();
    if (!spec || !spec[step]) { // 如果没有spec或如果注册的引导不存在,则不进入新用户引导
      return;
    }
    spec[step].id = `${Math.random()}`;
    dom.setAttribute('data-id', spec[step].id);
  }

  loop() {
    const spec = this.getSpec();
    if (!spec) {
      return;
    }
    for (let i = 0; i < spec.length; i++) {
      const s = spec[i];
      if (!s || (s.after && !isNaN(s.after.find(step => spec[step])))) {
        continue;
      }
      this.render(i);
    }
  }

  /**
   * 渲染遮罩,提示等元素
   * @param step 步骤编号
   */
  render(step) {
    const option = this.spec[step];
    let dom = document.querySelector(`[data-id=${option.id}]`);

    // 通过parentNode定位父dom
    if (dom && option.path) {
      option.path.split('.').map(k => {
        dom = dom[k];
      });
    }

    this.clear(step);

    if (!dom) {
      return;
    }

    let rect = dom.getBoundingClientRect();

    // 高亮显示区域
    const mask = document.createElement('div');
    mask.className = 'guide-mask';
    if (option.trigger === 'forbidden') {
      mask.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    } else if (option.trigger === 'manual') {
      mask.style.pointerEvents = 'none';
    } else {
      mask.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dom.click();
        this.finish(step);
      });
    }

    // 遮罩显示区域
    let maskBg;
    if (option.showMask) {
      maskBg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      maskBg.setAttribute('class', 'guide-mask-bg');
      var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', `
        0,0 0,99999 99999,99999, 99999,0 0,0
        ${rect.left},${rect.top} ${rect.right},${rect.top}
        ${rect.right},${rect.bottom} ${rect.left},${rect.bottom}
        ${rect.left},${rect.top}
      `);
      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline.setAttribute('points', `
        ${rect.left},${rect.top} ${rect.right},${rect.top}
        ${rect.right},${rect.bottom} ${rect.left},${rect.bottom}
        ${rect.left},${rect.top}
      `);
      polygon.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
      });

      maskBg.appendChild(polygon);
      maskBg.appendChild(polyline);
      document.body.appendChild(maskBg);
    }

    let tooltip;
    if (option.tip) {
      tooltip = this.tip(step, option, rect);
      document.body.appendChild(tooltip);
    }

    this.spec[step] = { ...option, dom, mask, tooltip, maskBg };
    dom.appendChild(mask);
  }

  finish(step) {
    this.clear(step);
    this.spec && (this.spec[step] = null);
    if (!this.spec || !this.spec.find(d => d)) {
      this.destroy();
      return;
    }
    const spec = this.spec.map(d => d && {
      id: d.id,
      tip: d.tip,
      trigger: d.trigger,
      after: d.after,
      path: d.path,
      position: d.position,
      next: d.next,
      finish: d.finish,
      showSkip: d.showSkip,
      showMask: d.showMask,
    });
    localStorage.setItem('spec', JSON.stringify(spec));

    this.loop(); // 当结束某步骤后立即轮询一次,定位到下一步
  }

  clear(step) {
    const item = this.spec && this.spec[step];
    if (!item) {
      return;
    }

    // 清除mask
    item.mask && item.dom.removeChild(item.mask);
    item.maskBg && document.body.removeChild(item.maskBg);

    // 清除tip
    item.tooltip && document.body.removeChild(item.tooltip);

    // 清除数据中保存的dom对象
    item.dom = null;
    item.mask = null;
    item.maskBg = null;
    item.tooltip = null;
  }

  destroy() {
    clearInterval(this.interval);
    delete this.interval;
    delete this.spec;
    delete localStorage.spec;
  }

  setPosition(dom, rect, position) {
    if (position === 'left') {
      dom.style.cssText = `
        left: ${rect.left - 210}px;
        top: ${(rect.top + rect.bottom) / 2}px;
        transform: translateY(-50%);
      `;
    } else if (position === 'bottom') {
      dom.style.cssText = `
        left: ${(rect.left + rect.right) / 2}px;
        top: ${rect.bottom + 10}px;
        transform: translateX(-50%);
      `;
    } else {
      dom.style.cssText = `
        left: ${rect.right + 10}px;
        top: ${(rect.top + rect.bottom) / 2}px;
        transform: translateY(-50%);
      `;
    }
  }

  tip(step, option, rect) {
    const { tip, position } = option;
    const tooltip = document.createElement('div');
    tooltip.innerHTML = `<p>${tip}</p>`;
    tooltip.className = `guide-tip ${position || 'right'}`;
    this.setPosition(tooltip, rect, position);

    if (option.showSkip) {
      const goAway = document.createElement('a');
      goAway.className = 'guide-tip-go-away';
      goAway.innerHTML = '跳过';
      goAway.addEventListener('click', () => {
        this.clear(step);
        this.destroy();
      });
      tooltip.appendChild(goAway);
    }

    if (option.showNext) {
      const next = document.createElement('a');
      next.className = 'guide-tip-next';
      next.innerHTML = option.nextText || '下一步';
      next.addEventListener('click', () => {
        this.finish(step);
      });
      tooltip.appendChild(next);
    }

    return tooltip;
  }
}

export default Guide.getInstance();
