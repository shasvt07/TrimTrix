import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import OnboardingScreen from '../components/screens/OnboardingScreen';
import Login from '../components/screens/Login';
import TabNavigation from './TabNavigation';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OwnerNavigation from './OwnerNavigation';



const MainNav = () => {
  const {currentUser,isOwner} = useContext(AuthContext);

  
  return (
    <NavigationContainer>
      {currentUser !== null ? (currentUser.isOwner ? <OwnerNavigation/> : <TabNavigation />): <AuthStack/>}
    </NavigationContainer>
  )
}

export default MainNav

const styles = StyleSheet.create({})