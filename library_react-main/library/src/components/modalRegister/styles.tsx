import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
    },
    closeBtnContainer: {
        alignItems: 'flex-end',
    },
    inputsContainer: {
        marginBottom: 25,
    },
    label: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#444',
    },
    input: {
        height: 45,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        borderColor: '#bbb',
        borderWidth: 1.5,
        borderRadius: 12,
        backgroundColor: '#f1f1f1',
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#4CAF50",
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 15,
    },
    textBtn: {
        color: "#FFF",
        fontSize: 19,
        fontWeight: 'bold',
    },
});
