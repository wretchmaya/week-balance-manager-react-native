/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { Section } from './components/Section/Section';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from './components/Header/Header';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { EnhancedModal } from './components/EnhancedModal/EnhancedModal';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
    handleDecrementBalance,
    handleWeekHistory,
    selectBalance,
    selectHistory,
} from './store/rootReducer';
import { getDateFormat } from './helpers/getDateFormat';
import { HistoryItem } from './components/HistoryItem/HistoryItem';
import { TEXT } from './variables/text';
import { COLORS } from './variables/colors';

const App = (): JSX.Element => {
    const history = useAppSelector(selectHistory);
    const balance = useAppSelector(selectBalance);
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
            <View>
                <Header />
                <Section></Section>
                <EnhancedModal
                    handleBalanceCalculation={handleBalanceCalculation}
                />
            </View>
            <View>
                <View style={styles.listHead}>
                    <Text style={[styles.listHead__title, styles.titleDate]}>
                        {TEXT.DATE}
                    </Text>
                    <View style={styles.listHead__content}>
                        <Text style={styles.listHead__title}>{TEXT.SPENT}</Text>
                        <Text style={styles.listHead__title}>
                            {TEXT.REMAINDER}
                        </Text>
                    </View>
                </View>
                <View>
                    <ScrollView style={styles.listContent}>
                        {history.map((item, index) => (
                            <HistoryItem {...item} key={index} />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: COLORS.DARK_BLUE,
        height: '100%',
        color: COLORS.WHITE,
    },
    titleDate: {
        marginLeft: 40,
    },
    listHead: {
        marginVertical: 15,
        marginHorizontal: 40,
        marginRight: 14,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listHead__title: {
        color: COLORS.WHITE,
    },
    listHead__content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 165,
        marginLeft: 55,
    },
    listContent: {
        height: 500,
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
