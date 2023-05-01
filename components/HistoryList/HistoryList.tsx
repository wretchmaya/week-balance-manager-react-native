import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../variables/colors';
import { useAppSelector } from '../../store/hooks';
import { selectHistory } from '../../store/rootReducer';
import React from 'react';
import { TEXT } from '../../variables/text';
import { HistoryItem } from '../HistoryItem/HistoryItem';

export const HistoryList = () => {
    const history = useAppSelector(selectHistory);

    return (
        <View style={styles.historySectionContainer}>
            <View style={styles.listHead}>
                <Text style={[styles.listHead__title, styles.titleDate]}>
                    {TEXT.DATE}
                </Text>
                <View style={styles.listHead__content}>
                    <Text style={styles.listHead__title}>{TEXT.SPENT}</Text>
                    <Text style={styles.listHead__title}>{TEXT.REMAINDER}</Text>
                </View>
            </View>
            <View style={styles.historyListContainer}>
                <ScrollView style={styles.historyList}>
                    {history?.map((item, index) => (
                        <HistoryItem {...item} key={index} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleDate: {
        width: 50,
    },
    listHead: {
        marginVertical: 15,
        marginHorizontal: 25,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    listHead__title: {
        color: COLORS.WHITE,
    },
    listHead__content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        marginRight: 55,
    },
    historySectionContainer: {
        flex: 1,
    },
    historyListContainer: {
        flex: 1,
    },
    historyList: {
        flex: 1,
    },
});
