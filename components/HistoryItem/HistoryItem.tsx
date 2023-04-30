import { View, Text, StyleSheet, Button } from 'react-native';
import {
    HistoryEntry,
    handleRemoveHistoryEntry,
} from '../../store/rootReducer';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import React from 'react';
import { useAppDispatch } from '../../store/hooks';

export const HistoryItem = ({
    date,
    spent,
    remainder,
}: HistoryEntry): JSX.Element => {
    const dispatch = useAppDispatch();

    const removeItem = (): void => {
        dispatch(handleRemoveHistoryEntry(remainder, spent));
    };
    return (
        <View style={styles.item}>
            <Text style={[styles.title, styles.titleDate]}>{date}</Text>
            <Text style={[styles.title, styles.titleSpent]}>{spent}</Text>
            <Text style={[styles.title, styles.titleBalance]}>{remainder}</Text>

            <Button title="del" onPress={removeItem} color={COLORS.DARK_BLUE} />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: COLORS.AZURE,
    },
    title: {
        fontSize: FONTS.SIZE.TEXT,
        verticalAlign: 'middle',
    },
    titleDate: {},
    titleSpent: {
        color: COLORS.RED,
        width: 35,
        textAlign: 'center',
    },
    titleBalance: {
        color: COLORS.MONEY_GREEN,
    },
});
