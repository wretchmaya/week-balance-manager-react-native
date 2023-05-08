import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { selectAllHistory } from '../../store/rootReducer';
import { useAppSelector } from '../../store/hooks';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import { TEXT } from '../../variables/text';

export const FullHistoryTab = () => {
    const history = useAppSelector(selectAllHistory);

    const calculateTotalSpent = () => {
        return history.reduce((acc, curr) => {
            acc += Number(curr.spent);
            return acc;
        }, 0);
    };

    const calculateTotalDays = () => {
        return history.reduce((acc, curr, i, target) => {
            const day = curr?.date.split(' ')[1];
            const nextDay = target[i + 1]?.date.split(' ')[1];
            if (day !== nextDay) {
                acc += 1;
            }
            return acc;
        }, 0);
    };

    return (
        <View style={styles.wrapper}>
            <View>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {TEXT.COMMON.TOTAL_DAYS}: {calculateTotalDays()}
                    </Text>
                    <Text style={styles.title}>
                        {TEXT.COMMON.TOTAL_SPENT}:{' '}
                        <Text style={styles.titleSpent}>
                            {calculateTotalSpent()}
                        </Text>{' '}
                        {TEXT.COMMON.UAH}
                    </Text>
                </View>
                <FlatList
                    data={history}
                    renderItem={({ item }) => <HistoryItem {...item} />}
                    keyExtractor={item => item.date + item.spent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS.DARK_BLUE,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    content: {
        flexDirection: 'row',
    },
    title: {
        color: COLORS.WHITE,
        fontSize: FONTS.SIZE.TEXT,
        margin: 12,
    },
    titleSpent: {
        color: COLORS.CINNABAR_RED,
    },
});
