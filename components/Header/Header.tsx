import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';
import { TEXT } from '../../variables/text';

export const Header = (): JSX.Element => {
    return (
        <View>
            <Text style={styles.headerTitle}>{TEXT.APP.TITLE}</Text>
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
