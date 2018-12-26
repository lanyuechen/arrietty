import id24, { uuid } from './index';

describe('UUID', () => {
  it('uuid length', () => {
    expect(uuid().length).toBe(36);
  });
  it('id24 length', () => {
    expect(id24().length).toBe(24);
  });
  it('unique', () => {
    for (let i = 0; i < 10; i++) {
      expect(id24() === id24()).toBe(false);
    }
  });
});
