export default function deepMerge(target, source, isValue) {
  if (typeof(target) !== 'object' || typeof(source) !== 'object') {
    return source;
  }

  if (typeof(isValue) === 'function' && isValue(source, target)) {
    return source;
  }

  const keys = Object.keys(source);
  const result = Object.keys(target).reduce((p, n) => {
    if (keys.indexOf(n) === -1) {
      p[n] = target[n];
    }
    return p;
  }, {});
  for (let key of keys) {
    if (typeof(target[key]) === 'object' && typeof(source[key]) === 'object') {
      result[key] = deepMerge(target[key], source[key], isValue);
    } else {
      result[key] = source[key];
    }
  }

  if (Array.isArray(target)) {
    return Object.values(result);
  }

  return result;
}
