import moment from 'moment';
export const getIsMondayToday = () => {
    const today = moment();
    const isMonday = today.isoWeekday() === 1;
    return isMonday;
};
