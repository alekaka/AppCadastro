import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/HomeScreen';
import ListScreen from '../pages/ListScreen';

const MainStack = createStackNavigator();

export default () => {
    return(
        <MainStack.Navigator>
            <MainStack.Screen name="HOME" component={HomeScreen} options={{
                title: "Cadastre-se",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#9326ff"
                },
                headerTitleStyle: {
                    fontSize: 23,
                    color: "#fff"
                }
            }}/>
            <MainStack.Screen name="LIST" component={ListScreen} options={{
                title: "Usuários Cadastrados",
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#9326ff"
                },
                headerTitleStyle: {
                    fontSize: 23,
                    color: "#fff"
                }
            }}/>
        </MainStack.Navigator>
    );
};