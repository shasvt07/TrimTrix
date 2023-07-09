import { useContext } from 'react';
import * as api from '../../api/index'
import { AuthContext } from '../../context/AuthContext';



export const OwnerRegister = async(userData) => {
    try{
        const data = await api.ownerRegister(userData).then(res => {
            return res.data});
        // dispatch({type:"CUSTOMER_AUTH", payload:data});
        return data;
        
    }catch(err){
        console.log("Register error in action folder",err);
    }
}

export const OwnerLogin = async(userData) => {
    try{
        const data = await api.ownerLogin(userData).then(res => {
            return res.data});
        // dispatch({type:"CUSTOMER_AUTH", payload:data});
        return data;
    }catch(err){
        console.log("Login error in action folder",err);
    }
}