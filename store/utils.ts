import AsyncStorage from '@react-native-async-storage/async-storage';
import { getIsMondayToday } from '../helpers/getIsMondayToday';
import { HistoryEntry } from './rootReducer';

const WEEK_HISTORY = '@WeekHistory';
const WEEK_BALANCE = '@WeekBalance';
const INITIAL_BALANCE = '@InitialWeekBalance';
const HAS_SET_WEEK_BALANCE = '@HasSetWeekBalance';
const ALL_HISTORY = '@AllHistory';
const HAS_CLEARED_STORAGE = '@HasClearedStorage';

export const saveDataToStorage = async (
    weekHistory: HistoryEntry[],
    weekBalance: number,
    initialWeekBalance: number,
    hasSetWeekBalance: boolean,
    allHistory: HistoryEntry[],
) => {
    try {
        await AsyncStorage.multiSet([
            [WEEK_HISTORY, JSON.stringify(weekHistory)],
            [WEEK_BALANCE, JSON.stringify(weekBalance)],
            [INITIAL_BALANCE, JSON.stringify(initialWeekBalance)],
            [HAS_SET_WEEK_BALANCE, JSON.stringify(hasSetWeekBalance)],
            [ALL_HISTORY, JSON.stringify(allHistory)],
        ]);
        // await AsyncStorage.setItem(WEEK_HISTORY, JSON.stringify(weekHistory));
        // await AsyncStorage.setItem(WEEK_BALANCE, JSON.stringify(weekBalance));
        // await AsyncStorage.setItem(
        //     INITIAL_BALANCE,
        //     JSON.stringify(initialWeekBalance),
        // );
        // await AsyncStorage.setItem(
        //     HAS_SET_WEEK_BALANCE,
        //     JSON.stringify(hasSetWeekBalance),
        // );
        // await AsyncStorage.setItem(ALL_HISTORY, JSON.stringify(allHistory));
        // await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
};

export const getDataFromStorage = async () => {
    try {
        const weekHistory = await AsyncStorage.getItem(WEEK_HISTORY);
        const weekBalance = await AsyncStorage.getItem(WEEK_BALANCE);
        const initialWeekBalance = await AsyncStorage.getItem(INITIAL_BALANCE);
        const hasSetWeekBalance = await AsyncStorage.getItem(
            HAS_SET_WEEK_BALANCE,
        );

        const values =
            weekHistory &&
            weekBalance &&
            initialWeekBalance &&
            hasSetWeekBalance;

        if (values) {
            return [
                JSON.parse(weekHistory),
                JSON.parse(weekBalance),
                JSON.parse(hasSetWeekBalance),
                JSON.parse(initialWeekBalance),
            ];
        }
        return false;
    } catch (error) {
        console.log(error);
    }
};

export const getAllHistory = async () => {
    const allHistory = await AsyncStorage.getItem(ALL_HISTORY);
    if (allHistory) {
        return JSON.parse(allHistory);
    }
    return false;
};

export const clearStorageOnMonday = async () => {
    const hasClearedStorage = await AsyncStorage.getItem(HAS_CLEARED_STORAGE);
    const isMonday = getIsMondayToday();

    if (isMonday && !hasClearedStorage) {
        const allKeys = await AsyncStorage.getAllKeys();
        const keysToClear = allKeys.filter(key => key !== ALL_HISTORY);
        console.log(keysToClear, 'to remove');
        console.log(allKeys, 'all keys');
        await AsyncStorage.multiRemove(keysToClear);
        await AsyncStorage.setItem(HAS_CLEARED_STORAGE, 'true');
    }
};

export const getIsSetWeekBalanceOnMonday = async () => {
    const hasSetWeekBalance = await AsyncStorage.getItem(HAS_SET_WEEK_BALANCE);
    const isMonday = getIsMondayToday();

    if (isMonday && !hasSetWeekBalance) {
        await AsyncStorage.setItem(HAS_SET_WEEK_BALANCE, 'true');
    }
};
