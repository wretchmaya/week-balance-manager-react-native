import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

interface InitialState {
    weekBalance: number;
    weekHistory: HistoryEntry[];
    isModalVisible: boolean;
    hasSetWeekBalance: boolean;
    isLoading: boolean;
}

export interface HistoryEntry {
    date: string;
    spent: string;
    remainder: number;
}

const initialState: InitialState = {
    weekBalance: 0,
    weekHistory: [],
    isModalVisible: false,
    hasSetWeekBalance: false,
    isLoading: true,
};

export const rootSlice = createSlice({
    name: 'week balance calcutalor',
    initialState,
    reducers: {
        updateState(state, action) {
            state.weekHistory = action.payload.weekHistory;
            state.weekBalance = action.payload.weekBalance;
            state.hasSetWeekBalance = action.payload.hasSetWeekBalance;
            state.isLoading = false;
        },
        updateHistory(state, action) {
            state.weekHistory = [action.payload, ...state.weekHistory];
        },
        decrementBalance(state, action) {
            state.weekBalance = state.weekBalance - action.payload;
        },
        toggleModal(state) {
            state.isModalVisible = !state.isModalVisible;
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
    },
});

export const selectBalance = (state: RootState) => state.mainStore.weekBalance;
export const selectHistory = (state: RootState) => state.mainStore.weekHistory;
export const selectIsLoading = (state: RootState) => state.mainStore.isLoading;
export const selectModalStatus = (state: RootState) =>
    state.mainStore.isModalVisible;
export const selectHasSetWeekBalance = (state: RootState) =>
    state.mainStore.hasSetWeekBalance;

export const {
    decrementBalance,
    toggleModal,
    updateState,
    updateHistory,
    resetState,
    setWeekBalance,
    setIsLoading,
} = rootSlice.actions;

export const handleModalToggle =
    () =>
    (dispatch: AppDispatch): void => {
        dispatch(toggleModal());
    };

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

export default rootSlice.reducer;
