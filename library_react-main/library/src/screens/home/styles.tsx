import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 38,
        fontWeight: 'bold',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
});
