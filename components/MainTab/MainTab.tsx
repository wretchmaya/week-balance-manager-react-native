import React from 'react';
import { useAppSelector } from '../../store/hooks';
import {
    selectHasSetWeekBalance,
    selectIsLoading,
} from '../../store/rootReducer';
import { StyleSheet, View } from 'react-native';
import { Preloader } from '../Preloader/Preloader';
import { Section } from '../Section/Section';
import { SettingBalanceModal } from '../SettingBalanceModal/SettingBalanceModal';
import { HistoryList } from '../HistoryList/HistoryList';
import { COLORS } from '../../variables/colors';
import { Header } from '../Header/Header';

export const MainTab = () => {
    const hasSetWeekBalance = useAppSelector(selectHasSetWeekBalance);
    const isLoading = useAppSelector(selectIsLoading);

    return (
        <View style={styles.backGround}>
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <Header />
                    <Section />
                    {!hasSetWeekBalance && <SettingBalanceModal />}
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
