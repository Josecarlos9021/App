import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import api from '@/services/api';
import styles from '@/components/modalRegister/styles';

export function ModalUser({ onClose }: { onClose: () => void }) {
    const [userName, setUserName] = useState('');
    const [cpf, setCpf] = useState('');
    const [selectedGenero, setSelectedGenero] = useState('Escolha');

    async function registerUser() {
        if (userName == "" || cpf == "") {
            Alert.alert("Preencha todos os campos")
            setUserName("")
        }
        try {
            await api.post('/users', {
                name: userName,
                cpf: cpf,
                gender: selectedGenero,
            });
            onClose();
        } catch (error) {
            console.log("Erro ao cadastrar o usuário" + error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.closeBtnContainer}>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" size={36} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputsContainer}>
                    <Text style={styles.label}>Nome do Usuário</Text>
                    <TextInput style={styles.input} value={userName} onChangeText={setUserName} />
                    <Text style={styles.label}>CPF</Text>
                    <TextInput style={styles.input} value={cpf} onChangeText={setCpf} />
                    <Text style={styles.label}>Gênero</Text>
                    <Picker
                        selectedValue={selectedGenero}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedGenero(itemValue)}
                    >
                        <Picker.Item label="Escolha" value="Escolha" color="#00000090" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Feminino" value="Feminino" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={registerUser}>
                    <Text style={styles.textBtn}>CADASTRAR USUÁRIO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
