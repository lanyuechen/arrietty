import Formula from './index';

describe('Formula', () => {
  it('transform', () => {
    expect(Formula.parse('1 + 2 + 3').join(', ')).toBe('1, 2, +, 3, +');
    expect(Formula.parse('1 + (2 + 3)').join(', ')).toBe('1, 2, 3, +, +');
    expect(Formula.parse('1 * 2 + 3').join(', ')).toBe('1, 2, *, 3, +');
    expect(Formula.parse('1 * (2 + 3)').join(', ')).toBe('1, 2, 3, +, *');
    expect(Formula.parse('(1 + 2) * (3 + 4) + 5').join(', ')).toBe('1, 2, +, 3, 4, +, *, 5, +');
    expect(Formula.parse('1 + (2 + (3 + (4 + 5))').join(', ')).toBe('1, 2, 3, 4, 5, +, +, +, +');
  });

  it('calc', () => {
    expect(Formula.calc('1 + 2 + 3')).toBe(6);
    expect(Formula.calc('1 + (2 + 3)')).toBe(6);
    expect(Formula.calc('1 * 2 + 3')).toBe(5);
    expect(Formula.calc('1 * (2 + 3)')).toBe(5);
    expect(Formula.calc('(1 + 2) * (3 + 4) + 5')).toBe(26);
    expect(Formula.calc('1 + (2 + (3 + (4 + 5))')).toBe(15);
  });
});