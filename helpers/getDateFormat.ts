import moment from 'moment';
export const getDateFormat = () => {
    const date = moment().utcOffset(180).format('dddd DD, HH:mm');
    return date;
};
