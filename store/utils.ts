import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIsMondayToday } from '../helpers/getIsMondayToday';
import { HistoryEntry } from './rootReducer';

export const saveDataToStorage = async (
    history: HistoryEntry[],
    weekBalance: number,
    hasSetWeekBalance: boolean,
) => {
    try {
        await AsyncStorage.setItem('weekHistory', JSON.stringify(history));
        await AsyncStorage.setItem('weekBalance', JSON.stringify(weekBalance));
        await AsyncStorage.setItem(
            'hasSetWeekBalance',
            JSON.stringify(hasSetWeekBalance),
        );
    } catch (error) {
        console.log(error);
    }
};

export const getDataFromStorage = async () => {
    try {
        const weekHistory = await AsyncStorage.getItem('weekHistory');
        const weekBalance = await AsyncStorage.getItem('weekBalance');
        const hasSetWeekBalance = await AsyncStorage.getItem(
            'hasSetWeekBalance',
        );
        if (weekHistory && weekBalance && hasSetWeekBalance) {
            return [
                JSON.parse(weekHistory),
                JSON.parse(weekBalance),
                JSON.parse(hasSetWeekBalance),
            ];
        }
    } catch (error) {
        console.log(error);
    }
};

export const clearStorageOnMonday = async () => {
    const hasClearedStorage = await AsyncStorage.getItem('hasClearedStorage');
    const isMonday = getIsMondayToday();

    if (isMonday && !hasClearedStorage) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('hasClearedStorage', 'true');
    }
};

export const getIsSetWeekBalanceOnMonday = async () => {
    const hasSetWeekBalance = await AsyncStorage.getItem('hasSetWeekBalance');
    const isMonday = getIsMondayToday();

    if (isMonday && !hasSetWeekBalance) {
        await AsyncStorage.setItem('hasSetWeekBalance', 'true');
    }
};
