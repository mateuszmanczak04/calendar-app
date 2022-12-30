import moment from 'moment';

export const getDateSlug = (date: Date) => {
  return moment(date).format('YYYY-MM-DD');
};
