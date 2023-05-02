import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { handleModalToggle, selectModalStatus } from '../../store/rootReducer';
import {
    Modal,
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

interface BalanceCalculationModalProps {
    handleBalanceCalculation: (spent: string, note: string) => void;
}

export const BalanceCalculationModal = ({
    handleBalanceCalculation,
}: BalanceCalculationModalProps): JSX.Element => {
    const isModalVisible = useAppSelector(selectModalStatus);
    const dispatch = useAppDispatch();
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
        handleBalanceCalculation(inputValue.spentAmount, inputValue.note);
        setInputValue({ spentAmount: '', note: '' });
        dispatch(handleModalToggle());
    };

    return (
        <Modal animationType="slide" visible={isModalVisible}>
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
                        value={inputValue.note}
                    />
                    <Button
                        title={TEXT.BUTTON.DONE}
                        onPress={handleOnPress}
                        disabled={!inputValue.spentAmount}
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
