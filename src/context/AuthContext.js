import React,{createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[isOwner, setIsOwner] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const setisOwnerTrue = () => {
        setIsOwner(true);
        AsyncStorage.setItem('isOwner' , JSON.stringify(true));
    }
    const setIsOwnerFalse = () => {
        setIsOwner(false);
        AsyncStorage.setItem('isOwner' , JSON.stringify(false));
    }
    const login = (user) => {
        try{
            setCurrentUser(user);
            AsyncStorage.setItem('user' , JSON.stringify(user));
            
        }catch(err){
            console.log("Login error", err);
        }
    }
    const logout = () => {
        try{
            setCurrentUser(null);
            AsyncStorage.removeItem('user');
            AsyncStorage.setItem('isOwner' , JSON.stringify(false));

        }
        catch(err){
            console.log("Logout Error", err)
        }
    }

    const isLoggedIn = async() => {
        try{
            var user = await AsyncStorage.getItem('user').then(JSON.parse);
            setCurrentUser(user);

            var value = await AsyncStorage.getItem('isOwner').then(JSON.parse);
            setIsOwner(value);
        }
        catch(err){
            console.log("is LoggedIn error", err);
        }
    }   
    
    useEffect(() => {
        isLoggedIn();

    },[])

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser,login,logout, isLoggedIn,isOwner,setIsOwner,setIsOwnerFalse,setisOwnerTrue}}>
            {children}
        </AuthContext.Provider>
    )
}