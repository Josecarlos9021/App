import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import api from '@/services/api';
import styles from '@/components/modalRegister/styles';

export function ModalBook({ onClose }: { onClose: () => void }) {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [selectedGenero, setSelectedGenero] = useState('Selecione');

    async function registerBook() {
        if (bookName === "" || author === "" || selectedGenero === "Selecione") {
            Alert.alert("Preencha todos os campos");
            return;
        }
        try {
            await api.post('/books', {
                name: bookName,
                author: author,
                genre: selectedGenero,
            });
            onClose();
        } catch (error) {
            console.error("Erro ao cadastrar o livro", error);
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
                    <Text style={styles.label}>Nome do Livro</Text>
                    <TextInput style={styles.input} value={bookName} onChangeText={setBookName} />
                    <Text style={styles.label}>Autor</Text>
                    <TextInput style={styles.input} value={author} onChangeText={setAuthor} />
                    <Text style={styles.label}>Gênero</Text>
                    <Picker
                        selectedValue={selectedGenero}
                        onValueChange={(itemValue) => setSelectedGenero(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione" value="Selecione" color="#00000090" />
                        <Picker.Item label="Terror" value="Terror" />
                        <Picker.Item label="Ficção Científica" value="Ficção Científica" />
                        <Picker.Item label="Fantasia" value="Fantasia" />
                        <Picker.Item label="Romance" value="Romance" />
                        <Picker.Item label="Mistério" value="Mistério" />
                        <Picker.Item label="Suspense" value="Suspense" />
                        <Picker.Item label="Infantil" value="Infantil" />
                        <Picker.Item label="Drama" value="Drama" />
                        <Picker.Item label="Outro" value="Outro" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.button} onPress={registerBook}>
                    <Text style={styles.textBtn}>CADASTRAR LIVRO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
