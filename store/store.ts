import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer, { setIsLoading, updateState } from './rootReducer';
import debounce from 'lodash.debounce';
import {
    clearStorageOnMonday,
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

    const cachedData = await getDataFromStorage();

    if (cachedData) {
        const [weekHistory, weekBalance, hasSetWeekBalance] = cachedData;
        store.dispatch(
            updateState({
                weekHistory,
                weekBalance,
                hasSetWeekBalance,
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
        store.getState().mainStore.hasSetWeekBalance,
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
