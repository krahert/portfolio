import elapsedTime from 'utils/elapsedTime';

describe('testing elapsedTime helper function', () => {
  it('returns the correct result', () => {
    const date = new Date;
    expect(elapsedTime(date)).toEqual('a few seconds ago');
  });

  it('handles invalid dates', () => {
    const date = 'invalid date';
    expect(elapsedTime(date)).toEqual(null);
  });
});