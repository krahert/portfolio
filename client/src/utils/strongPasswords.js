const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*])(?=.{8,})/;
/* 
  • The string must contain at least 1 lowercase alphabetical character
  • The string must contain at least 1 uppercase alphabetical character
  • The string must contain at least 1 numeric character
  • The string must contain at least one special character !@#$&*
  • The string must be eight characters or longer
*/
export default (password) => {
  const check = re.test(password);
  if (!check) {
    return false;
  } else {
    return true;
  }
};