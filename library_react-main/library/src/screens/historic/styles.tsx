import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },

    borrowedBookItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 10,
    },

    returnedBookItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },

    borrowedBookTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },

    returnedBookTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },

    returnButton: {
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },

    returnButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    returnedBookDate: {
        fontSize: 14,
        color: '#808080',
    },

});