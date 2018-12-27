import Collection from './index';

describe('Collection', () => {
  it('transform', () => {
    expect(new Collection(['[0, 5]']).and('(2, 10]').toString().join('|')).toBe('(2, 5]');
    expect(new Collection().and('[1, 5]', '[5, 10]').toString().join('|')).toBe('[5, 5]');
    expect(new Collection().or('[1, 5)', '[5, 10]').toString().join('|')).toBe('[1, 10]');
    expect(new Collection().or('[.1, 1.2)', '(-.5, 10.1]').toString().join('|')).toBe('(-0.5, 10.1]');
    expect(new Collection().or('[1,2]', '[3, 4]').toString().join('|')).toBe('[1, 2]|[3, 4]');
  });
});