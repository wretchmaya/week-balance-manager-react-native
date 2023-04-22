import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIsMondayToday } from '../helpers/getIsMondayToday';
import { HistoryEntry } from './rootReducer';

export const saveDataToStorage = async (
    history: HistoryEntry[],
    weekBalance: number,
) => {
    try {
        await AsyncStorage.setItem('weekHistory', JSON.stringify(history));
        await AsyncStorage.setItem('weekBalance', JSON.stringify(weekBalance));
    } catch (error) {
        console.log(error);
    }
};

export const getDataFromStorage = async () => {
    try {
        const weekHistory = await AsyncStorage.getItem('weekHistory');
        const weekBalance = await AsyncStorage.getItem('weekBalance');
        if (weekHistory && weekBalance) {
            return [JSON.parse(weekHistory), JSON.parse(weekBalance)];
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
