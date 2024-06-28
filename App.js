import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from './screens/HomeScreen';
import FormScreen from './screens/FormScreen';
import DetailScreen from './screens/detailscreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Compte">
        <Stack.Screen name="Compte" component={DashBoard} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Enrôllement" component={FormScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Détails" component={DetailScreen} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
