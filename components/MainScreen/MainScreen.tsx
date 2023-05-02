import React from 'react';
import { getDateFormat } from '../../helpers/getDateFormat';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    handleDecrementBalance,
    handleWeekHistory,
    selectBalance,
    selectHasSetWeekBalance,
    selectIsLoading,
} from '../../store/rootReducer';
import { StyleSheet, View } from 'react-native';
import { Preloader } from '../Preloader/Preloader';
import { Section } from '../Section/Section';
import { SettingBalanceModal } from '../SettingBalanceModal/SettingBalanceModal';
import { BalanceCalculationModal } from '../BalanceCalculationModal/BalanceCalculationModal';
import { HistoryList } from '../HistoryList/HistoryList';
import { COLORS } from '../../variables/colors';
import { Header } from '../Header/Header';

export const MainScreen = () => {
    const balance = useAppSelector(selectBalance);
    const hasSetWeekBalance = useAppSelector(selectHasSetWeekBalance);
    const isLoading = useAppSelector(selectIsLoading);
    const dispatch = useAppDispatch();

    const handleBalanceCalculation = (spantAmount: string, note: string) => {
        dispatch(handleDecrementBalance(Number(spantAmount)));
        createHistoryEntry(spantAmount, note);
    };

    const createHistoryEntry = (spantAmount: string, note: string) => {
        const historyEntry = {
            date: getDateFormat(),
            spent: spantAmount,
            remainder: balance - Number(spantAmount),
            note: note,
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
                    {!hasSetWeekBalance && <SettingBalanceModal />}
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
