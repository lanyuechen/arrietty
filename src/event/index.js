const EVENT_INSTANCE = Symbol.for('event-instance');

class CustomEvent {
  constructor() {
    Object.defineProperty(this, 'handles', {
      value: {},
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  static getInstance() {
    if (!window[EVENT_INSTANCE]) {
      window[EVENT_INSTANCE] = new CustomEvent();
    }
    return window[EVENT_INSTANCE];
  }

  on(name, cb) {
    if (!this.handles[name]) {
      this.handles[name] = [];
    }
    this.handles[name].push(cb);
    return this;
  }
  
  onOnce(name, cb) {
     const fn = (...params) => {
        cb(...params);
        this.off(name, fn);
     };
     this.on(name, fn);
  }

  emit(name, ...params) {
    if (!this.handles[name]) {
      return;
    }
    this.handles[name].map(cb => {
      cb(...params);
    });
  }

  off(name, handle) {
    if (!this.handles[name]) {
      return;
    }
    this.handles[name] = this.handles[name].filter(cb => cb !== handle);
    if (this.handles[name].length === 0) {
      delete(this.handles[name]);
    }
  }
}

export default CustomEvent.getInstance();