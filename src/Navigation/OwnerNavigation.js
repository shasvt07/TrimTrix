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
import ShopRegister from '../components/screens/ShopOwner/ShopRegister'
import StoreDetails from '../components/screens/ShopDetails'
import { AuthContext } from '../context/AuthContext'
import MyStore from '../components/screens/ShopOwner/MyStore'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShopUpdate from '../components/screens/ShopOwner/ShopUpdate'
import OwnerActivity from '../components/screens/ShopOwner/OwnerActivity'
import Map from '../components/reusables/MapView'
import SetMapLocation from '../components/reusables/SetMapLocation'



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyStoreNavigation = () => {
    return(
        <Stack.Navigator screenOptions={{
            headerShown:false}}
        >
            <Stack.Screen name="myStore" component={MyStore}/>
            <Stack.Screen name="updateStore" component={ShopUpdate} />
            <Stack.Screen name="registerStore" component={ShopRegister} />
            <Stack.Screen name="map" component={SetMapLocation} />
        </Stack.Navigator>
    )
}

const OwnerNavigation = () => {
    const color = '#000000'
    const size = 20
    
  return (
    
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarInactiveTintColor:'grey',
        tabBarActiveTintColor: '#000000',
        tabBarStyle:{height:60},
        
    }}>
        <Tab.Screen name = 'MyStore' component={MyStoreNavigation} options={{
            tabBarIcon:({color, size}) => (
                <View style={{alignItems:'center'}}>
                <Icon name='home' color={color} size={size}/>
                <Text>Home</Text>
                </View>
            )}
        }/>
        {/* <Tab.Screen name = 'Services' component={ShopRegister} options={{
            tabBarIcon:({color, size}) => (
                <Ionicons name='menu' color={color} size={size}/>
            )}
        }/>
         */}
        <Tab.Screen name = 'Activity' component={OwnerActivity} options={{
            tabBarIcon:({color, size}) => (
                <View style={{alignItems:'center'}}>
                    <Icon color={color} size={size} name="clock"/>
                <Text>Activity</Text>
                </View>
            )}
        }/>
        <Tab.Screen name = 'Account' component={Account} options={{
            tabBarIcon:({color, size}) => (
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name='account' color={color} size={size}/>
                    <Text>Account</Text>
                </View>
            )}
        }/>
        
    </Tab.Navigator>
  )
}

export default OwnerNavigation

const styles = StyleSheet.create({})