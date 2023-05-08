import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { getWeekId } from '../helpers/getWeekId';

interface InitialState {
    weekBalance: number;
    initialWeekBalance: number;
    weekHistory: HistoryEntry[];
    allHistory: HistoryEntry[];
    weekId: number;
    hasSetWeekBalance: boolean;
    isLoading: boolean;
}

export interface HistoryEntry {
    date: string;
    spent: string;
    remainder: number;
    note: string;
    weekId: number;
}

const initialState: InitialState = {
    weekBalance: 0,
    weekId: getWeekId(),
    initialWeekBalance: 0,
    weekHistory: [],
    allHistory: [],
    hasSetWeekBalance: false,
    isLoading: true,
};

export const rootSlice = createSlice({
    name: 'week balance calcutalor',
    initialState,
    reducers: {
        updateState(state, action) {
            state.weekHistory = action.payload.weekHistory || [];
            state.weekBalance = Number(action.payload.weekBalance) || 0;
            state.initialWeekBalance =
                Number(action.payload.initialWeekBalance) || 0;
            state.hasSetWeekBalance = action.payload.hasSetWeekBalance || false;
            state.allHistory = action.payload.allHistory || [];
            console.log(action.payload, 'actionplaylaod');
            state.isLoading = false;
        },
        updateWeekHistory(state, action) {
            state.weekHistory = [action.payload, ...state.weekHistory];
        },
        updateAllHistory(state, action) {
            state.allHistory = [action.payload, ...state.allHistory];
        },
        decrementBalance(state, action) {
            state.weekBalance = state.weekBalance - action.payload;
        },
        resetState(state) {
            state.weekBalance = state.initialWeekBalance;
            state.allHistory = state.allHistory.filter(
                week => week.weekId !== state.weekId,
            );
            state.weekHistory = [];
        },
        setWeekBalance(state, action) {
            state.weekBalance = action.payload;
            state.initialWeekBalance = action.payload;
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
export const selectWeekHistory = (state: RootState) =>
    state.mainStore.weekHistory;
export const selectAllHistory = (state: RootState) =>
    state.mainStore.allHistory;
export const selectIsLoading = (state: RootState) => state.mainStore.isLoading;
export const selectHasSetWeekBalance = (state: RootState) =>
    state.mainStore.hasSetWeekBalance;

export const {
    decrementBalance,
    updateState,
    updateWeekHistory,
    updateAllHistory,
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

export const handleHistory =
    (history: HistoryEntry) =>
    (dispatch: AppDispatch): void => {
        dispatch(updateWeekHistory(history));
        dispatch(updateAllHistory(history));
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
