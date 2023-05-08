import moment from 'moment';
export const getWeekId = () => moment().isoWeekday(1).week();
