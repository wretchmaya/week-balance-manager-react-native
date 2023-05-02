import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

interface InitialState {
    weekBalance: number;
    weekHistory: HistoryEntry[];
    hasSetWeekBalance: boolean;
    isLoading: boolean;
}

export interface HistoryEntry {
    date: string;
    spent: string;
    remainder: number;
    note: string;
}

const initialState: InitialState = {
    weekBalance: 0,
    weekHistory: [],
    hasSetWeekBalance: false,
    isLoading: true,
};

export const rootSlice = createSlice({
    name: 'week balance calcutalor',
    initialState,
    reducers: {
        updateState(state, action) {
            state.weekHistory = action.payload.weekHistory;
            state.weekBalance = +action.payload.weekBalance;
            state.hasSetWeekBalance = action.payload.hasSetWeekBalance;
            state.isLoading = false;
        },
        updateHistory(state, action) {
            state.weekHistory = [action.payload, ...state.weekHistory];
        },
        decrementBalance(state, action) {
            state.weekBalance = state.weekBalance - action.payload;
        },
        resetState(state) {
            state.weekBalance = 2000;
            state.weekHistory = [];
        },
        setWeekBalance(state, action) {
            state.weekBalance = action.payload;
            state.hasSetWeekBalance = true;
        },
        setIsLoading(state) {
            state.isLoading = false;
        },
        removeHistoryEnty(state, action) {
            state.weekBalance =
                state.weekBalance + Number(action.payload.spentAmount);
            state.weekHistory = state.weekHistory.filter(
                item => item.remainder !== action.payload.remainder,
            );
        },
    },
});

export const selectBalance = (state: RootState) => state.mainStore.weekBalance;
export const selectHistory = (state: RootState) => state.mainStore.weekHistory;
export const selectIsLoading = (state: RootState) => state.mainStore.isLoading;
export const selectHasSetWeekBalance = (state: RootState) =>
    state.mainStore.hasSetWeekBalance;

export const {
    decrementBalance,
    updateState,
    updateHistory,
    resetState,
    setWeekBalance,
    setIsLoading,
    removeHistoryEnty,
} = rootSlice.actions;

export const handleDecrementBalance =
    (amount: number) =>
    (dispatch: AppDispatch): void => {
        dispatch(decrementBalance(amount));
    };

export const handleWeekHistory =
    (history: HistoryEntry) =>
    (dispatch: AppDispatch): void => {
        dispatch(updateHistory(history));
    };

export const handleResetState =
    () =>
    (dispatch: AppDispatch): void => {
        dispatch(resetState());
    };

export const handleSetWeekBalance =
    (amount: number) =>
    (dispatch: AppDispatch): void => {
        dispatch(setWeekBalance(amount));
    };

export const handleRemoveHistoryEntry =
    (remainder: number, spentAmount: string) =>
    (dispatch: AppDispatch): void => {
        dispatch(removeHistoryEnty({ remainder, spentAmount }));
    };

export default rootSlice.reducer;
