import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

interface ModalNotificationProps {
    visible: boolean;
    onClose: () => void;
    notifications: string[];
}

export function ModalNotification({ visible, onClose, notifications }: ModalNotificationProps) {
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            animationIn="slideInRight"
            animationOut="slideOutRight"
            backdropTransitionOutTiming={0} // Tira a piscada da tela quando fecha
        >
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Notificações</Text>
                </View>
                <View style={styles.content}>
                    {notifications.length === 0 ? (
                        <Text style={styles.notificationText}>Sem novas notificações</Text>
                    ) : (
                        notifications.map((notification, index) => (
                            <Text key={index} style={styles.notificationText}>
                                {notification}
                            </Text>
                        ))
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        padding: 25,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
    },
    closeButton: {
        position: 'absolute',
        left: 20,
        padding: 5,
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    notificationText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },
});
