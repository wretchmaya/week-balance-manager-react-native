import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import { TEXT } from '../../variables/text';
import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { handleResetState } from '../../store/rootReducer';

export const Header = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const createResetBalanceAlert = () =>
        Alert.alert(
            TEXT.ALERT.RESET_BALANCE.TITLE,
            TEXT.ALERT.RESET_BALANCE.TEXT,
            [
                {
                    text: TEXT.BUTTON.CANCEL,
                    style: 'cancel',
                },
                {
                    text: TEXT.BUTTON.YES,
                    onPress: () => dispatch(handleResetState()),
                },
            ],
        );

    return (
        <View>
            <Text style={styles.headerTitle}>{TEXT.APP.TITLE}</Text>
            <Button
                onPress={createResetBalanceAlert}
                title={TEXT.BUTTON.RESET}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: 'center',
        backgroundColor: COLORS.AZURE,
        padding: 16,
        fontSize: FONTS.SIZE.TITLE,
    },
});
