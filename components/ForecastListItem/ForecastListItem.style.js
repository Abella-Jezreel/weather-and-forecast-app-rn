import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    day: {
        fontSize: 20,
    },
    date: {
        fontSize: 20,
    },
    temperature: {
        fontSize: 20,
        width: 50,
        textAlign: "right",
    },
});