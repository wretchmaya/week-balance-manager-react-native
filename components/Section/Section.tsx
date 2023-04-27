import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { handleModalToggle, selectBalance } from '../../store/rootReducer';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import { TEXT } from '../../variables/text';

const POSITIVE_REMAINDER = 500;
export const Section = (): JSX.Element => {
    const balance = useAppSelector(selectBalance);
    const dispatch = useAppDispatch();
    const [isPositive, setIsPositive] = useState(true);

    const textColor = {
        color: isPositive ? COLORS.MONEY_GREEN : COLORS.RED,
    };

    useEffect(() => {
        balance > POSITIVE_REMAINDER
            ? setIsPositive(true)
            : setIsPositive(false);
    }, [balance]);

    return (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, textColor]}>{balance}</Text>
            <Button
                color={COLORS.CINNABAR_RED}
                title={TEXT.BUTTON.CALCULATE}
                onPress={() => dispatch(handleModalToggle())}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        margin: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: FONTS.SIZE.MAIN_TITLE,
        fontWeight: '900',
        textAlign: 'center',
        paddingBottom: 24,
    },
});
