import moment from 'moment';

export default (date: moment.Moment | null, ln: string, format = 'D MMM YYYY') => {
  if (date === null) return '';

  if (ln === 'ZH-CN') {
    return moment(date).locale(ln.toLowerCase()).format('M月D日');
  }

  return moment(date).locale(ln.toLowerCase()).format(format);
};
