import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { ModalUser } from "@/components/modalRegister/modalUser";
import { ModalBook } from "@/components/modalRegister/modalBook";
import styles from '@/screens/register/styles';

export default function Register() {
    // Estados para controlar a visibilidade dos modais
    const [modalVisibleUser, setModalVisibleUser] = useState(false);
    const [modalVisibleBook, setModalVisibleBook] = useState(false);

    // Função para abrir o modal de usuário
    const handleOpenModalUser = () => setModalVisibleUser(true);
    // Função para abrir o modal de livro
    const handleOpenModalBook = () => setModalVisibleBook(true);
    // Função para fechar ambos os modais
    const handleCloseModal = () => {
        setModalVisibleUser(false);
        setModalVisibleBook(false);
    };

    return (
        <View style={styles.container}>
            {/* Botão para abrir o modal de cadastro de usuário */}
            <TouchableOpacity style={styles.button} onPress={handleOpenModalUser}>
                <Text style={styles.textBtn}>CADASTRAR USUÁRIO</Text>
            </TouchableOpacity>

            {/* Botão para abrir o modal de cadastro de livro */}
            <TouchableOpacity style={styles.button} onPress={handleOpenModalBook}>
                <Text style={styles.textBtn}>CADASTRAR LIVRO</Text>
            </TouchableOpacity>

            {/* Import do Modal de cadastro de usuário na screen Register*/}
            {modalVisibleUser && (
                <Modal animationType="fade" transparent={true}>
                    <ModalUser onClose={handleCloseModal} />
                </Modal>
            )}
            {/* Import do Modal de cadastro de livro na screen Register*/}
            {modalVisibleBook && (
                <Modal animationType="fade" transparent={true}>
                    <ModalBook onClose={handleCloseModal} />
                </Modal>
            )}
        </View>
    );
}