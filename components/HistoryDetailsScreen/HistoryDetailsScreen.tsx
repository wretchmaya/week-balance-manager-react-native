import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import { View } from 'react-native';
import { TEXT } from '../../variables/text';

export const HistoryItemDetailsScreen = ({ route }: any) => {
    const { date, spent, note } = route.params;
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.detailsTextWrapper}>
                <Text style={styles.detailsText}>
                    {TEXT.MODAL.HISOTRY_DETAILS.TIME}:{' '}
                    <Text style={styles.detailsTextTime}>{date}</Text>
                </Text>
                <Text style={styles.detailsText}>
                    {TEXT.MODAL.HISOTRY_DETAILS.SPENT}:{' '}
                    <Text style={styles.detailsTextSpent}>{spent}</Text>{' '}
                    {TEXT.COMMON.UAH}
                </Text>
                <Text style={styles.detailsText}>
                    {TEXT.MODAL.HISOTRY_DETAILS.SPENT_ON}:{' '}
                    <Text style={styles.detailsTextNote}>{note}</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
    },
    detailsTextWrapper: {
        backgroundColor: COLORS.AZURE,
        borderRadius: 10,
        padding: 40,
    },
    detailsText: {
        fontSize: FONTS.SIZE.TEXT,
        margin: 10,
    },
    detailsTextTime: {
        color: COLORS.MONEY_GREEN,
    },
    detailsTextSpent: {
        color: COLORS.RED,
    },
    detailsTextNote: {
        color: COLORS.DARK_BLUE,
    },
});
