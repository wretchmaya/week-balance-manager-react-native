import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../variables/colors';
import { useAppSelector } from '../../store/hooks';
import { selectWeekHistory } from '../../store/rootReducer';
import React from 'react';
import { TEXT } from '../../variables/text';
import { HistoryItem } from '../HistoryItem/HistoryItem';

export const HistoryList = () => {
    const history = useAppSelector(selectWeekHistory);

    return (
        <View style={styles.historySectionContainer}>
            <View style={styles.listHead}>
                <Text style={[styles.listHead__title, styles.titleDate]}>
                    {TEXT.COMMON.DATE}
                </Text>
                <View style={styles.listHead__content}>
                    <Text style={styles.listHead__title}>
                        {TEXT.COMMON.SPENT}
                    </Text>
                    <Text style={styles.listHead__title}>
                        {TEXT.COMMON.REMAINDER}
                    </Text>
                </View>
            </View>
            <View style={styles.historyListContainer}>
                <ScrollView style={styles.historyList}>
                    {history?.map(item => {
                        return (
                            <HistoryItem
                                {...item}
                                withDeleteButton
                                key={item.date + item.spent}
                            />
                        );
                    })}
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
