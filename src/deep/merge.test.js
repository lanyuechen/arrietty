import deepMerge from './merge';
import deepCompare from './compare';

function test(a, b, result, isValue) {
  it(JSON.stringify(a) + ', ' + JSON.stringify(b), () => {
    expect(deepCompare(deepMerge(a, b, isValue), result)).toBe(true);
  });
}

describe('deep-merge', () => {
  test([1,2], ['a'], ['a', 2]);
  test([1], [], [1]);
  test({a: 'a'}, {b: 'b'}, {a: 'a', b: 'b'});
  test({a: 'a'}, {b: 'b'}, {b: 'b'}, (s, t) => {
    return true;
  });
  test({name: '小明'}, {name: '小红'}, {name: '小红'});
  test({name: '小明'}, 'haha', 'haha');
  test('haha', {name: '小红'}, {name: '小红'});
  test({name: '小明'}, {name: {age: 18}}, {name: {age: 18}});
  test({name: {age: 18, height: 180}}, {name: {age: 18, name: '小亮'}}, {name: {height: 180, age: 18, name: '小亮'}});
});
