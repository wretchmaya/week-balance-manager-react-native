import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    handleDecrementBalance,
    handleHistory,
    selectBalance,
} from '../../store/rootReducer';
import {
    Text,
    View,
    TextInput,
    Button,
    TextInputChangeEventData,
    NativeSyntheticEvent,
    StyleSheet,
} from 'react-native';
import { TEXT } from '../../variables/text';
import { FONTS } from '../../variables/fonts';
import { getDateFormat } from '../../helpers/getDateFormat';
import { useNavigation } from '@react-navigation/native';
import { getWeekId } from '../../helpers/getWeekId';

export const BalanceCalculationScreen = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const balance = useAppSelector(selectBalance);
    const navigation = useNavigation<any>();
    const [inputValue, setInputValue] = useState({
        spentAmount: '',
        note: '',
    });

    const handleInputChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>,
        inputName: string,
    ) => {
        const { text } = e.nativeEvent;
        setInputValue(prevState => ({ ...prevState, [inputName]: text }));
    };

    const handleOnPress = () => {
        handleBalanceCalculation();
        setInputValue({ spentAmount: '', note: '' });
        navigation.goBack();
    };

    const handleBalanceCalculation = () => {
        dispatch(handleDecrementBalance(Number(inputValue.spentAmount)));
        createHistoryEntry();
    };

    const createHistoryEntry = () => {
        const historyEntry = {
            date: getDateFormat(),
            spent: inputValue.spentAmount,
            remainder: balance - Number(inputValue.spentAmount),
            note: inputValue.note,
            weekId: getWeekId(),
        };
        dispatch(handleHistory(historyEntry));
    };

    return (
        <View style={styles.modalWrapper}>
            <View style={styles.modal}>
                <Text style={styles.modalTitle}>
                    {TEXT.MODAL.SPENT_BALANCE.INPUT_SPENT_LABEL}
                </Text>
                <TextInput
                    style={styles.modalInput}
                    onChange={e => handleInputChange(e, 'spentAmount')}
                    keyboardType="numeric"
                    placeholder="0"
                    value={inputValue.spentAmount}
                />
                <Text style={styles.modalTitle}>
                    {TEXT.MODAL.SPENT_BALANCE.INPUT_NOTE_LABEL}
                </Text>
                <TextInput
                    style={styles.modalInput}
                    onChange={e => handleInputChange(e, 'note')}
                    keyboardType="default"
                    placeholder="..."
                    value={inputValue.note}
                />
                <Button
                    title={TEXT.BUTTON.DONE}
                    onPress={handleOnPress}
                    disabled={!inputValue.spentAmount}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 250,
    },
    modalTitle: {
        fontSize: FONTS.SIZE.TEXT,
    },
    modalInput: {
        height: 60,
        fontSize: FONTS.SIZE.TITLE,
    },
});
