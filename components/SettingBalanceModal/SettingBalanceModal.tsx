import {
    Button,
    Text,
    TextInput,
    View,
    Modal,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import { useAppDispatch } from '../../store/hooks';
import { handleSetWeekBalance } from '../../store/rootReducer';
import { useState } from 'react';
import React from 'react';
import { TEXT } from '../../variables/text';
import { FONTS } from '../../variables/fonts';

export const SettingBalanceModal = () => {
    const dispatch = useAppDispatch();

    const [balanceValue, setBalanceValue] = useState('');

    const handleInputChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>,
    ) => {
        setBalanceValue(e.nativeEvent.text);
    };
    const handleOnPress = () => {
        dispatch(handleSetWeekBalance(Number(balanceValue)));
    };

    return (
        <Modal animationType="slide">
            <View style={styles.modalWrapper}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                        {TEXT.MODAL.ONMONDAY_BALANCE.INPUT_LABEL}
                    </Text>
                    <TextInput
                        style={styles.modalInput}
                        onChange={handleInputChange}
                        keyboardType="numeric"
                        placeholder="0"
                        value={balanceValue}
                    />
                    <Button
                        title={TEXT.BUTTON.DONE}
                        onPress={handleOnPress}
                        disabled={!balanceValue}
                    />
                </View>
            </View>
        </Modal>
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
