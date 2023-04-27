import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../variables/colors';

export const Preloader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={COLORS.RED} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
