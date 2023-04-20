import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export function Section(): JSX.Element {
    const [currentWeekBalance, setCurrentWeekBalance] = useState(2000);

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{currentWeekBalance}</Text>
            <Button title="calculate" onPress={() => console.log('awdawdawdawd')}></Button>
            <Text style={styles.sectionDescription}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
