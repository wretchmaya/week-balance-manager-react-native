import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer, { setIsLoading, updateState } from './rootReducer';
import debounce from 'lodash.debounce';
import {
    clearStorageOnMonday,
    getAllHistory,
    getDataFromStorage,
    getIsSetWeekBalanceOnMonday,
    saveDataToStorage,
} from './utils';

export const store = configureStore({
    reducer: {
        mainStore: rootReducer,
    },
});

(async () => {
    await clearStorageOnMonday();
    await getIsSetWeekBalanceOnMonday();
    console.log('anonym');
    const cachedData = await getDataFromStorage();
    const allHistory = await getAllHistory();
    console.log(cachedData, 'cachedata');
    if (cachedData && allHistory) {
        const [
            weekHistory,
            weekBalance,
            hasSetWeekBalance,
            initialWeekBalance,
        ] = cachedData;
        console.log('update state full');
        store.dispatch(
            updateState({
                weekHistory,
                weekBalance,
                hasSetWeekBalance,
                initialWeekBalance,
                allHistory,
            }),
        );
        return;
    } else if (allHistory) {
        console.log('update state all hisotry only');
        store.dispatch(
            updateState({
                allHistory,
            }),
        );
        return;
    }
    store.dispatch(setIsLoading());
})();

const _debounce = debounce(() => {
    saveDataToStorage(
        store.getState().mainStore.weekHistory,
        store.getState().mainStore.weekBalance,
        store.getState().mainStore.initialWeekBalance,
        store.getState().mainStore.hasSetWeekBalance,
        store.getState().mainStore.allHistory,
    );
}, 600);

store.subscribe(() => {
    _debounce();
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
