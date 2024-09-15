import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import styles from '@/screens/historic/styles';
import api from '@/services/api';
import { RootStackParamList } from '@/routes';

interface Book {
    id: number;
    title: string;
}

interface ReturnedBook {
    id: number;
    title: string;
    returnDate: Date;
}

type HistoricScreenRouteProp = RouteProp<RootStackParamList, 'Histórico'>;

export default function HistoricScreen() {
    const route = useRoute<HistoricScreenRouteProp>();
    const { userId } = route.params;

    const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
    const [returnedBooks, setReturnedBooks] = useState<ReturnedBook[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const borrowedResponse = await api.get(`/lendings/borrowed/${userId}`);
                const returnedResponse = await api.get(`/lendings/returned/${userId}`);
                setBorrowedBooks(borrowedResponse.data);
                setReturnedBooks(returnedResponse.data.map((book: any) => ({
                    ...book,
                    returnDate: new Date(book.returnDate),
                })));
            } catch (error) {
                console.error('Erro ao buscar livros', error);
            }
        };

        fetchBooks();
    }, [userId]);

    const handleReturnBook = async (bookId: number) => {
        try {
            await api.post(`/lendings/${bookId}/return`);
            const updatedBorrowedBooks = borrowedBooks.filter(book => book.id !== bookId);
            const returnedBook = borrowedBooks.find(book => book.id === bookId);
            if (returnedBook) {
                setReturnedBooks([...returnedBooks, { ...returnedBook, returnDate: new Date() }]);
            }
            setBorrowedBooks(updatedBorrowedBooks);
            Alert.alert('Livro devolvido com sucesso!');
        } catch (error) {
            console.error('Erro ao devolver o livro', error);
            Alert.alert('Erro ao devolver o livro');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Meus Livros</Text>
            <FlatList
                data={borrowedBooks}
                renderItem={({ item }) => (
                    <View style={styles.borrowedBookItem}>
                        <Text style={styles.borrowedBookTitle}>{item.title}</Text>
                        <TouchableOpacity style={styles.returnButton} onPress={() => handleReturnBook(item.id)}>
                            <Text style={styles.returnButtonText}>Entregar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />

            <Text style={styles.sectionTitle}>Livros Entregues</Text>
            <FlatList
                data={returnedBooks}
                renderItem={({ item }) => (
                    <View style={styles.returnedBookItem}>
                        <Text style={styles.returnedBookTitle}>{item.title}</Text>
                        <Text style={styles.returnedBookDate}>
                            Data de Entrega: {item.returnDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                        </Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}
