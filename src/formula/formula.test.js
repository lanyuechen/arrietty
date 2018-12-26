import Formula from './index';

describe('Formula', () => {
  it('transform', () => {
    expect(Formula.explain('1 + 2 + 3').join(', ')).toBe('1, 2, +, 3, +');
    expect(Formula.explain('1 + (2 + 3)').join(', ')).toBe('1, 2, 3, +, +');
    expect(Formula.explain('1 * 2 + 3').join(', ')).toBe('1, 2, *, 3, +');
    expect(Formula.explain('1 * (2 + 3)').join(', ')).toBe('1, 2, 3, +, *');
    expect(Formula.explain('(1 + 2) * (3 + 4) + 5').join(', ')).toBe('1, 2, +, 3, 4, +, *, 5, +');
    expect(Formula.explain('1 + (2 + (3 + (4 + 5))').join(', ')).toBe('1, 2, 3, 4, 5, +, +, +, +');
  });

  it('calc', () => {
    expect(Formula.result('1 + 2 + 3')).toBe(6);
    expect(Formula.result('1 + (2 + 3)')).toBe(6);
    expect(Formula.result('1 * 2 + 3')).toBe(5);
    expect(Formula.result('1 * (2 + 3)')).toBe(5);
    expect(Formula.result('(1 + 2) * (3 + 4) + 5')).toBe(26);
    expect(Formula.result('1 + (2 + (3 + (4 + 5))')).toBe(15);
  });
});