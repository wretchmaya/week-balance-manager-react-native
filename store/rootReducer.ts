import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

const initialState = {
    currentWeekBalance: 2000,
};

export const rootSlice = createSlice({
    name: 'week balance calcutalor',
    initialState,
    reducers: {
        decrementBalance(state, action) {
            state.currentWeekBalance =
                state.currentWeekBalance - action.payload;
        },
    },
    extraReducers: builder => {},
});

// export const selectUsers = (state: RootState) => state.mainStore.users;
// export const selectPage = (state: RootState) => state.mainStore.page;
// export const selectTotalPages = (state: RootState) =>
//     state.mainStore.totalPages;
// export const selectLoadingListStatus = (state: RootState) =>
//     state.mainStore.isLoadingList;
// export const selectLoadingFormStatus = (state: RootState) =>
//     state.mainStore.isLoadingForm;
// export const selectUserHasBeenCreated = (state: RootState) =>
//     state.mainStore.userHasBeenCreated;

export const {decrementBalance} = rootSlice.actions;

export default rootSlice.reducer;
