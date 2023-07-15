import * as api from '../../api/index'

export const createStore = (ownerId,shopData) => async(dispatch) => {
    try{
        const {data} = await api.createStore(ownerId,shopData);
        dispatch({type:"FETCH_STORE", payload:data});
        // return data;
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
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export const openClose = (storeId,openCloseinfo)  => async(dispatch) => {
    try{
        const {data} = await api.openCloseStore(storeId,openCloseinfo);
        dispatch({type:'OPEN_CLOSE',payload:openCloseinfo});
        // dispatch({type:"SHOP_STATUS", payload:{shopId:storeId,openClose:openCloseinfo}});
        return data;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchCustomer = ({seatInfo,customerId}) => async(dispatch) =>{
    console.log(seatInfo,customerId)
    try{
        const {data} = await api.fetchCustomer(customerId);
        const reqdata = {...seatInfo};
        reqdata.customerName = data.name;
        reqdata.phoneNumber = data.phoneNumber
        // console.log(reqdata);
        dispatch({type:'SET_LOBBY', payload:reqdata});
    // console.log(data);
    return data;
    }catch(err){
        console.log(err);
    }
}
