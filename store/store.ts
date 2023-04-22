import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer, { updateState } from './rootReducer';
import debounce from 'lodash.debounce';
import {
    clearStorageOnMonday,
    getDataFromStorage,
    saveDataToStorage,
} from './utils';

export const store = configureStore({
    reducer: {
        mainStore: rootReducer,
    },
});

(async () => {
    await clearStorageOnMonday();

    const cachedData = await getDataFromStorage();

    if (cachedData) {
        const [weekHistory, weekBalance] = cachedData;
        store.dispatch(
            updateState({
                weekHistory,
                weekBalance,
            }),
        );
    }
})();

const _debounce = debounce(() => {
    saveDataToStorage(
        store.getState().mainStore.weekHistory,
        store.getState().mainStore.weekBalance,
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
