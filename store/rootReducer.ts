import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

interface InitialState {
    weekBalance: number;
    weekHistory: HistoryEntry[];
    isModalVisible: boolean;
}

export interface HistoryEntry {
    date: string;
    spent: string;
    remainder: number;
}

const initialState: InitialState = {
    weekBalance: 2000,
    weekHistory: [],
    isModalVisible: false,
};

export const rootSlice = createSlice({
    name: 'week balance calcutalor',
    initialState,
    reducers: {
        updateState(state, action) {
            state.weekHistory = action.payload.weekHistory;
            state.weekBalance = action.payload.weekBalance;
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
    },
    extraReducers: builder => {},
});

export const selectBalance = (state: RootState) => state.mainStore.weekBalance;
export const selectHistory = (state: RootState) => state.mainStore.weekHistory;
export const selectModalStatus = (state: RootState) =>
    state.mainStore.isModalVisible;

export const { decrementBalance, toggleModal, updateState, updateHistory } =
    rootSlice.actions;

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

export default rootSlice.reducer;
