import moment from 'moment';
// moment().format();

export default startTime => {
 
  // const dateFormat = moment(startTime).format("dddd, MMMM Do YYYY, h:mm:ss a") || 'invalid date';

  // if (dateFormat !== 'Invalid date') {
    const result = moment(startTime).fromNow() || 'invalid date';
    return result;
  // }
  
  // return 'invalid date';
};
