import Explain from './index';

const explain = new Explain([
  {test: 'sum', func: ({ params }) => params.join('+')},
  {test: 'year', func: `to_char(CURRENT_TIMESTAMP, 'YYYY')`},
  {test: /^\$\w+$/, func: ({ func, params, props }) => `select _${func}(${params[0]}) from ${props.table}`},
  {test: ['max', 'min'], func: ({ func, params }) => `Math.${func}(${params})`}
]);

describe('Explain', () => {
  it('transform', () => {
    expect(explain.parse('1+2+3')).toBe('1+2+3');
    expect(explain.parse(' 1 +    2 +  3  ')).toBe('1+2+3');
    expect(explain.parse('sum(1,2,3)')).toBe('(1+2+3)');
    expect(explain.parse('1 + year()')).toBe(`1+(to_char(CURRENT_TIMESTAMP, 'YYYY'))`);
    expect(explain.parse('1 + sum(2, 3)')).toBe('1+(2+3)');
    expect(explain.parse('max(1, 2, 3)')).toBe('(Math.max(1,2,3))');
    expect(explain.parse('sum(1 * sum(2, 3), min(4, 5 + 6) * 7)')).toBe('(1*(2+3)+(Math.min(4,5+6))*7)');
    expect(explain.parse('$sum(a)', {table: 't1'})).toBe('(select _$sum(a) from t1)');
    expect(explain.parse('$sum($sum($sum(c1)))', {table: 't1'})).toBe('(select _$sum((select _$sum((select _$sum(c1) from t1)) from t1)) from t1)');
  });
});