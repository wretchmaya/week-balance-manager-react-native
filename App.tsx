/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { Section } from './components/Section/Section';
import { View, StyleSheet } from 'react-native';
import { Header } from './components/Header/Header';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BalanceCalculationModal } from './components/BalanceCalculationModal/BalanceCalculationModal';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
    handleDecrementBalance,
    handleWeekHistory,
    selectBalance,
    selectHasSetWeekBalance,
    selectIsLoading,
} from './store/rootReducer';
import { getDateFormat } from './helpers/getDateFormat';
import { COLORS } from './variables/colors';
import { Preloader } from './components/Preloader/Preloader';
import { BalanceSettingModal } from './components/BalanceSettingModal/BalanceSettingModal';
import { HistoryList } from './components/HistoryList/HistoryList';

const App = (): JSX.Element => {
    const balance = useAppSelector(selectBalance);
    const hasSetWeekBalance = useAppSelector(selectHasSetWeekBalance);
    const isLoading = useAppSelector(selectIsLoading);
    const dispatch = useAppDispatch();

    const handleBalanceCalculation = (spentValue: string) => {
        dispatch(handleDecrementBalance(Number(spentValue)));
        createHistoryEntry(spentValue);
    };

    const createHistoryEntry = (spentValue: string) => {
        const historyEntry = {
            date: getDateFormat(),
            spent: spentValue,
            remainder: balance - Number(spentValue),
        };
        dispatch(handleWeekHistory(historyEntry));
    };

    return (
        <View style={styles.backGround}>
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <Header />
                    <Section />
                    {!hasSetWeekBalance && <BalanceSettingModal />}
                    <BalanceCalculationModal
                        handleBalanceCalculation={handleBalanceCalculation}
                    />
                    <HistoryList />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: COLORS.DARK_BLUE,
        color: COLORS.WHITE,
        flex: 1,
    },
});

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
export default Root;
