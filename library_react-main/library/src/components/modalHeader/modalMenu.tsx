import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@/routes';
import api from '@/services/api';

type NavigationProp = BottomTabNavigationProp<RootStackParamList, 'Cadastrar'>;

interface ModalMenuProps {
    isVisible: boolean;
    onClose: () => void;
}

interface User {
    id: number;
    name: string;
}

export function ModalMenu({ isVisible, onClose }: ModalMenuProps) {
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários', error);
            }
        };

        if (isVisible) {
            fetchUsers();
        }
    }, [isVisible]);

    const handleNavigateToRegister = () => {
        onClose();
        navigation.navigate('Cadastrar');
    };

    const handleUserSelected = (userId: string) => {
        onClose();
        navigation.navigate('Histórico', { userId });
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            style={styles.modal}
            useNativeDriver
        >
            <View style={styles.modalContent}>
                <View style={styles.userPickerContainer}>
                    <MaterialIcons name="account-circle" size={40} color="#fff" />
                    <Picker
                        selectedValue={selectedUser}
                        onValueChange={(itemValue) => {
                            setSelectedUser(itemValue);
                            handleUserSelected(itemValue);
                        }}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="Selecione um usuário" value="" />
                        {users.map(user => (
                            <Picker.Item key={user.id} label={user.name} value={user.id.toString()} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Ainda não cadastrou seu usuário?</Text>
                    <TouchableOpacity onPress={handleNavigateToRegister}>
                        <Text style={styles.registerButton}>Cadastre aqui.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-start',
    },
    modalContent: {
        width: '60%',
        height: '100%',
        backgroundColor: '#121212',
        padding: 5,
    },
    userPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    picker: {
        flex: 1,
        color: '#fff',
    },
    pickerItem: {
        fontSize: 16,
        color: '#fff',
        backgroundColor: '#121212',
    },
    registerContainer: {
        marginTop: 20,
    },
    registerText: {
        color: '#fff',
        fontSize: 16,
    },
    registerButton: {
        color: '#1E90FF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
