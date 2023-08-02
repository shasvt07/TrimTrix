import React,{createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

export const AuthContext = createContext();

const socket = io.connect('https://trimtrixbackend.onrender.com');

export const AuthProvider = ({children}) => {
    const[isOwner, setIsOwner] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [bookingDone, setBookingDone] = useState(false);
    const [isLoading,setIsLoading] = useState(true);


    const setisOwnerTrue = async () => {
        setIsOwner(true);
        await AsyncStorage.setItem('isOwner' , JSON.stringify(true));
    }
    const setIsOwnerFalse = async () => {
        setIsLoading(true);
        setIsOwner(false);
        await AsyncStorage.setItem('isOwner' , JSON.stringify(false));
        setIsLoading(false);

    }
    const login = async(user) => {
        try{
            setIsLoading(true);
            setCurrentUser(user);
            await AsyncStorage.setItem('user' , JSON.stringify(user));
            setIsLoading(false);

            
        }catch(err){
            console.log("Login error", err);
        }
    }
    const logout = async () => {
        try{
            setCurrentUser(null);
            await AsyncStorage.removeItem('user');
            await AsyncStorage.setItem('isOwner' , JSON.stringify(false));

        }
        catch(err){
            console.log("Logout Error", err)
        }
    }

    const isLoggedIn = async() => {
        try{

            setIsLoading(true);
            var user = await AsyncStorage.getItem('user').then(JSON.parse);
            // await AsyncStorage.removeItem('user');
            setCurrentUser(user);

            var value = await AsyncStorage.getItem('isOwner').then(JSON.parse);
            setIsOwner(value);
            setIsLoading(false);

                // AsyncStorage.setItem('bookedSeat' , JSON.stringify(false));

        }
        catch(err){
            console.log("is LoggedIn error", err);
        }
    }   

    const updateBookingDone = (data) => {
        setBookingDone(data);
        AsyncStorage.setItem('bookedSeat' , JSON.stringify(data));
    }

    const hasBookedSeat = async() => {
        var value = await AsyncStorage.getItem('bookedSeat').then(JSON.parse);
            setBookingDone(value);
    }
    
    useEffect(() => {
        isLoggedIn();
        hasBookedSeat();    
    },[])

    return (
        <AuthContext.Provider value={{currentUser,
        setCurrentUser,
        login,logout, 
        isLoggedIn,isOwner,
        setIsOwner,
        setIsOwnerFalse,
        setisOwnerTrue,
        updateBookingDone,
        bookingDone,
        isLoading,
        socket
        }}>
            {children}
        </AuthContext.Provider>
    )
}