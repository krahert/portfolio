import moment from 'moment';
// moment().format();

export default startTime => {
 
  const result = moment(startTime).fromNow();
  return result;
};
