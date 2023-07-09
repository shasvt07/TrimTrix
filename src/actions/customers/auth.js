import { useContext } from 'react';
import * as api from '../../api/index'
import { AuthContext } from '../../context/AuthContext';



export const customerRegister = (dispatch) = async(userData) => {
    try{
        const data = await api.customerRegister(userData).then(res => {
            return res.data});
        // dispatch({type:"CUSTOMER_AUTH", payload:data});
        return data;
        
    }catch(err){
        console.log("Register error in action folder",err);
    }
}

export const customerLogin = (dispatch) = async(userData) => {
    try{
        const data = await api.customerLogin(userData).then(res => {
            return res.data});
        // dispatch({type:"CUSTOMER_AUTH", payload:data});
        return data;
    }catch(err){
        console.log("Login customer error in action folder",err);
    }
}