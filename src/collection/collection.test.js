import Collection from './index';

describe('Collection', () => {
  it('new collection by array', () => {
    expect(new Collection(['[0, 5]']).and('(2, 10]').output().join('|')).toBe('(2, 5]');
    expect(new Collection().and('[1, 5]', '[5, 10]').output().join('|')).toBe('[5, 5]');
    expect(new Collection().or('[1, 5)', '[5, 10]').output().join('|')).toBe('[1, 10]');
    expect(new Collection().or('[.1, 1.2)', '(-.5, 10.1]').output().join('|')).toBe('(-0.5, 10.1]');
    expect(new Collection().or('[1,2]', '[3, 4]').output().join('|')).toBe('[1, 2]|[3, 4]');
  });

  it('new collection by string', () => {
    expect(new Collection(`[1, 2] | [3, 4]`).output().join('|')).toBe('[1, 2]|[3, 4]');
  });
});