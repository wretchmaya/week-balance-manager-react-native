import { View, Text, StyleSheet, Button, Alert, Pressable } from 'react-native';
import {
    HistoryEntry,
    handleRemoveHistoryEntry,
} from '../../store/rootReducer';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { TEXT } from '../../variables/text';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../variables/routes';

interface HistoryItemProps extends HistoryEntry {
    withDeleteButton?: boolean;
}
export const HistoryItem = ({
    date,
    spent,
    remainder,
    note,
    withDeleteButton,
}: HistoryItemProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();

    const removeItem = () => {
        Alert.alert(
            TEXT.ALERT.DELETE_HISTORY_ENTRY.TITLE,
            TEXT.ALERT.DELETE_HISTORY_ENTRY.TEXT,
            [
                {
                    text: TEXT.BUTTON.NO,
                    style: 'cancel',
                },
                {
                    text: TEXT.BUTTON.YES,
                    onPress: () =>
                        dispatch(handleRemoveHistoryEntry(remainder, spent)),
                },
            ],
        );
    };

    const navigateToDetails = () => {
        navigation.navigate(ROUTES.SCREENS.DETAILS, { date, spent, note });
    };

    return (
        <Pressable onPress={navigateToDetails}>
            <View style={styles.item}>
                <View style={styles.test}>
                    <Text style={[styles.title, styles.titleDate]}>{date}</Text>
                    <Text style={[styles.title, styles.titleSpent]}>
                        {spent}
                    </Text>
                    <Text style={[styles.title, styles.titleBalance]}>
                        {remainder}
                    </Text>

                    {withDeleteButton ? (
                        <Button
                            title={TEXT.BUTTON.DELETE}
                            onPress={removeItem}
                            color={COLORS.DARK_BLUE}
                        />
                    ) : (
                        <Text style={styles.note}>{note}</Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    test: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    item: {
        paddingVertical: 20,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: COLORS.AZURE,
        borderRadius: 10,
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
    note: {
        flexWrap: 'wrap',
        width: 60,
    },
});
