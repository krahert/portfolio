import moment from 'moment';

export default startTime => {

  const dateFormat = moment(startTime, moment.ISO_8601).isValid();
  
  if (dateFormat) {
    const result = moment(startTime).fromNow() || 'invalid date';
    return result;
  }
  
  return null;
};
