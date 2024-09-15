import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalNotification } from '@/components/modalHeader/modalNotification';
import { ModalMenu } from '@/components/modalHeader/modalMenu';
import styles from '@/components/header/styles';

export function CustomHeader() {

    const insets = useSafeAreaInsets();
    const [notificationModalVisible, setNotificationModalVisible] = useState(false);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);
    const toggleNotificationModal = () => {
        setNotificationModalVisible(!notificationModalVisible);
    };
    const toggleLoginModal = () => {
        setLoginModalVisible(!loginModalVisible);
    };

    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity onPress={toggleLoginModal} style={styles.iconContainer}>
                <MaterialIcons name="menu" size={28} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.title}>LIVRARIA</Text>
            <TouchableOpacity onPress={toggleNotificationModal} style={styles.iconContainer}>
                <Fontisto name="bell" size={24} color="white" />
            </TouchableOpacity>
            <ModalNotification visible={notificationModalVisible} onClose={toggleNotificationModal} notifications={notifications} />
            <ModalMenu isVisible={loginModalVisible} onClose={toggleLoginModal} />
        </View>
    );
}