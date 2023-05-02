import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { selectBalance } from '../../store/rootReducer';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import { TEXT } from '../../variables/text';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../variables/routes';

const POSITIVE_REMAINDER = 500;
export const Section = (): JSX.Element => {
    const balance = useAppSelector(selectBalance);
    const [isPositive, setIsPositive] = useState(true);
    const navigation = useNavigation<any>();

    const textColor = {
        color: isPositive ? COLORS.MONEY_GREEN : COLORS.RED,
    };

    useEffect(() => {
        balance > POSITIVE_REMAINDER
            ? setIsPositive(true)
            : setIsPositive(false);
    }, [balance]);

    const openModal = () => {
        navigation.navigate(ROUTES.SCREENS.BALANCE_CALCULATION);
    };

    return (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, textColor]}>{balance}</Text>
            <Button
                color={COLORS.CINNABAR_RED}
                title={TEXT.BUTTON.CALCULATE}
                onPress={openModal}
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
