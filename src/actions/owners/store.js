import * as api from '../../api/index'

export const createStore = (ownerId,shopData) => async(dispatch) => {
    try{
        const {data} = await api.createStore(ownerId,shopData);
        dispatch({type:"FETCH_STORE", payload:data});
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchStore = (ownerId) => async(dispatch) =>{
    try{
    const {data} = await api.fetchStore(ownerId);
    dispatch({type:"FETCH_STORE", payload:data});
    // console.log(data);
    return data;
    }catch(err){
        console.log(err);
    }
}

export const updateStore = async(ownerId,shopData)  => {
    try{
        const {data} = await api.updateStore(ownerId,shopData);
        // console.log("updatestore",data);
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchCustomer = (customerId) => async(dispatch) =>{
    try{
    const {data} = await api.fetchCustomer(customerId);
        dispatch({type:'SET_LOBBY', payload:data});
    // console.log(data);
    return data;
    }catch(err){
        console.log(err);
    }
}
