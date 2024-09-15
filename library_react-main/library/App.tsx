import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './src/routes';
import { CustomHeader } from '@/components/header/index';


export default function App() {
  return (
    //TIVE QUE COLOCAR ESSE SAFE AREA PRA NÃO BUGAR E FICAR CORTANDO O HEADER
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Definir a aparência da barra de status */}
          <StatusBar barStyle="light-content" translucent={true} backgroundColor={'#121212'} />
          {/* CustomHeader é o Header personalizado que TIVE QUE COLOCAR DENTRO DO CONTAINER NAVIGATION PARA ELE CONSEGUIR ALOCAR O MENU E DIRECIONAR PARA TELA REGISTER */}
          <CustomHeader />
          {/* Routes define as rotas e navegação do app */}
          <Routes />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
