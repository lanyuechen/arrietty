export Event from './event';

export Formula from './formula';
export Explain from './explain';
export Collection from './collection';
export Statis from './statis';
export Guide from './guide';

export Deep from './deep';

export uuid from './uuid';

//todo 暂存，分组排序
export function groupSort(data, ...rules) {
  if (!rules.length) {
    return data;
  }
  return data.sort((a, b) => {
    for (let rule of rules) {
      if (rule(a, b)) {
        return rule(a, b);
      }
    }
  });
}