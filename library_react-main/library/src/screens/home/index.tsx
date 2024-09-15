import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/screens/home/styles'

export default function Home() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/bookshelf.jpg')}
                style={styles.imgBackground}
                blurRadius={2}
            >
                {/* EFEITO FRU-FRU NA FOTO DE BACKGROUND */}
                <LinearGradient
                    colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)"]}
                    locations={[0.5, 0.7, 0.9]}
                    style={styles.gradient}
                />
                <Text style={styles.title}>Seja Bem-vindo(a) à sua Biblioteca!</Text>
            </ImageBackground>
        </View>
    );
}