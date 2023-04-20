import {View, Text, StyleSheet} from 'react-native';

export const Header = () => {
    return (
        <View>
            <Text style={styles.headerTitle}>Week Balance Calculator</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        textAlign: 'center',
        backgroundColor: 'purple',
        color: 'white',
        padding: 16,
        fontSize: 24,
    },
});
