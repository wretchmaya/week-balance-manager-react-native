import { View, Text, StyleSheet } from 'react-native';
import { HistoryEntry } from '../../store/rootReducer';
import { COLORS } from '../../variables/colors';
import { FONTS } from '../../variables/fonts';

export const HistoryItem = ({
    date,
    spent,
    remainder,
}: HistoryEntry): JSX.Element => (
    <View style={styles.item}>
        <Text style={(styles.title, styles.titleDate)}>{date}</Text>
        <Text style={[styles.title, styles.titleSpent]}>{spent}</Text>
        <Text style={[styles.title, styles.titleBalance]}>{remainder}</Text>
    </View>
);

const styles = StyleSheet.create({
    item: {
        backgroundColor: COLORS.AZURE,
        paddingVertical: 20,
        marginVertical: 4,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: FONTS.SIZE.TEXT,
    },
    titleDate: {
        width: 140,
        fontSize: FONTS.SIZE.TEXT,
    },
    titleSpent: {
        color: COLORS.RED,
        textAlign: 'center',
        width: 40,
        marginRight: 20,
    },
    titleBalance: {
        color: COLORS.MONEY_GREEN,
        marginRight: 7,
    },
});
