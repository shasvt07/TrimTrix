import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OnboardingScreen from '../components/screens/OnboardingScreen';
import Login from '../components/screens/Login';
import TabNavigation from './TabNavigation';
import CustomerRegister from '../components/screens/Register';



const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator >
        <Stack.Screen name='onBoardingScreen' component={OnboardingScreen} options={{headerShown:false}} />
        <Stack.Screen name='Register' component={CustomerRegister} options={{headerShown:false}} />
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})