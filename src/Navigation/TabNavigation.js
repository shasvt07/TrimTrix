import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/FontAwesome5'

import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../components/screens/Home';
import Activity from '../components/screens/Activity';
import Account from '../components/screens/Account';
import { AuthContext } from '../context/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShopDetails from '../components/screens/ShopDetails'
import SearchRecommendations from '../components/reusables/SearchRecomendation'



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigation = () => {
    const color = '#000000'
    const size = 20

    const HomeNavigation = () => {
        return(
            <Stack.Navigator screenOptions={{
                headerShown:false}}
            >
                <Stack.Screen  name="home2" component={Home}/>
                <Stack.Screen  name="shopDetails" component={ShopDetails} />
                <Stack.Screen  name="search" component={SearchRecommendations} />
            </Stack.Navigator>
        )
    }
    
  return (
    
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarInactiveTintColor:'grey',
        tabBarActiveTintColor: '#000000',
    }}>
        <Tab.Screen name = 'Home' component={HomeNavigation} options={{
            tabBarIcon:({color, size}) => (
                <Icon name='home' color={color} size={size}/>
            )}
        }/>
        {/* <Tab.Screen name = 'Services' component={ShopRegister} options={{
            tabBarIcon:({color, size}) => (
                <Ionicons name='menu' color={color} size={size}/>
            )}
        }/> */}
        
        <Tab.Screen name = 'Activity' component={Activity} options={{
            tabBarIcon:({color, size}) => (
                <Feather name='activity' color={color} size={size}/>
            )}
        }/>
        <Tab.Screen name = 'Account' component={Account} options={{
            tabBarIcon:({color, size}) => (
                <MaterialCommunityIcons name='account' color={color} size={size}/>
            )}
        }/>
        
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({})