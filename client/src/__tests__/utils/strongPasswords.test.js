import strongPasswords from 'utils/strongPasswords';

describe('testing strongPasswords helper function', () => {
  it('correctly shows if a password is weak', () => {
    expect(strongPasswords('abcdef')).toEqual(false);
  });
  
  it('correctly shows if a password is strong', () => {
    expect(strongPasswords('!1Abcdef')).toEqual(true);
  });
});