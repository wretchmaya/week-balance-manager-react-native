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

interface EnhancedModalProps {
    handleBalanceCalculation: (value: string) => void;
}

export const EnhancedModal = ({
    handleBalanceCalculation,
}: EnhancedModalProps): JSX.Element => {
    const isModalVisible = useAppSelector(selectModalStatus);
    const dispatch = useAppDispatch();
    const [spentValue, setSpentValue] = useState('');

    const handleInputChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>,
    ) => {
        setSpentValue(e.nativeEvent.text);
    };

    const handleOnPress = () => {
        handleBalanceCalculation(spentValue);
        setSpentValue('');
        dispatch(handleModalToggle());
    };

    return (
        <Modal animationType="slide" visible={isModalVisible}>
            <View style={styles.modalWrapper}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                        {TEXT.APP.INPUT_TITLE}
                    </Text>
                    <TextInput
                        style={styles.modalInput}
                        onChange={handleInputChange}
                        keyboardType="numeric"
                        placeholder="0"
                        value={spentValue}
                    />
                    <Button
                        title={TEXT.DONE}
                        onPress={handleOnPress}
                        disabled={!spentValue}
                    ></Button>
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
