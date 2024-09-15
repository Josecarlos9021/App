import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './screens/home';
import Register from './screens/register';
import Lending from './screens/lending';
import Historic from './screens/historic';

// Define os tipos de parâmetros para as rotas (Tive que criar para colocar cadastrar no modalLogin)
export type RootStackParamList = {
    Início: undefined;
    Cadastrar: undefined;
    Emprestar: undefined;
    Histórico: { userId: string };
};

// Cria um navegador de abas (Tab_bar_Navigation)
const Tab = createBottomTabNavigator<RootStackParamList>();

// Função que define as rotas e configurações do navegador de abas
export function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "#fff",
                tabBarStyle: {
                    position: 'absolute',
                    borderTopWidth: 0,
                    backgroundColor: "#121212",
                    paddingBottom: 5,
                    paddingTop: 5,

                },
            }}
        >
            <Tab.Screen
                name="Início"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="book-plus-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Emprestar"
                component={Lending}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons name="book-search-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Histórico"
                component={Historic}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="history" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
