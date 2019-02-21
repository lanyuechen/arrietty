"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuid = uuid;
exports.default = _default;

/**
 * 生成UUID（伪UUID，随机值模拟）
 */
function uuid() {
  var seed = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  seed = seed.replace(/x/g, function () {
    var r = Math.random() * 16 | 0;
    return r.toString(16);
  });
  seed = seed.replace('y', (Math.random() * 16 & 0x3 | 0x8).toString(16));
  return seed;
}

function _default() {
  return uuid().replace(/-/g, '').substr(0, 24);
}