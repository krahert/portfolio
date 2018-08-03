import validateEmail from 'utils/validateEmail';

describe('tests the validateEmail helper function', () => {
  it('correctly validates an email format', () => {
    expect(validateEmail('test@gmail.com')).toEqual(true);
  });
  
  it('shows if an email format is invalid', () => {
    expect(validateEmail('testgmailcom')).toEqual(false);
  });
});