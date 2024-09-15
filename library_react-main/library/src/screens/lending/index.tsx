import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '@/screens/lending/styles';
import api from '@/services/api';

export default function LendingScreen() {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchUsersAndBooks = async () => {
            try {
                const usersResponse = await api.get('/users');
                const booksResponse = await api.get('/books');
                setUsers(usersResponse.data);
                setBooks(booksResponse.data);
            } catch (error) {
                console.error("Erro ao buscar usuários e livros", error);
            }
        };

        fetchUsersAndBooks();
    }, []);

    const handleLendBook = async () => {
        if (selectedUser === '' || selectedBook === '') {
            Alert.alert("Selecione um usuário e um livro");
            return;
        }
        try {
            await api.post('/lendings', {
                userId: selectedUser,
                bookId: selectedBook,
                date: date.toISOString(),
            });
            Alert.alert("Livro Emprestado");
        } catch (error) {
            console.error("Erro ao emprestar o livro", error);
        }
    };

    const handleReturnBook = async () => {
        // Implementar lógica de devolução do livro
        Alert.alert("Livro Entregue");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Usuário</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedUser}
                    onValueChange={(itemValue) => setSelectedUser(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Selecione um usuário" value="" />
                    {users.map((user: any) => (
                        <Picker.Item key={user.id} label={user.name} value={user.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Livro</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedBook}
                    onValueChange={(itemValue) => setSelectedBook(itemValue)}
                    style={styles.input}
                >
                    <Picker.Item label="Selecione um livro" value="" />
                    {books.map((book: any) => (
                        <Picker.Item key={book.id} label={book.name} value={book.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Data</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                <Text>{date.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            setDate(selectedDate);
                        }
                    }}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleLendBook}>
                <Text style={styles.textBtn}>EMPRESTAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleReturnBook}>
                <Text style={styles.textBtn}>ENTREGAR</Text>
            </TouchableOpacity>
        </View>
    );
}
