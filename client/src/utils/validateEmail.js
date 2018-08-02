const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (email) => {
  const check = re.test(email);
  if (!check) {
    return false;
  } else {
    return true;
  }
};