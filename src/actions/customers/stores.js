import * as api from '../../api/index.js'

export const fetchStores = async() =>{
    try{
    const {data} = await api.fetchStores().then(res => {return res});
    // console.log(data);
    return data;
    }catch(err){
        console.log(err);
    }
}

export const fetchShop = (shopId) => async(dispatch) =>{
    try{
    const {data} = await api.fetchShopDetails(shopId);
    // console.log("action:",data);
    dispatch({type:"STORE_DETAILS", payload:data});
    return data;

    }catch(err){
        console.log(err);
    }
}

export const processSeat = (bookingDetail) => async(dispatch) => {
    try{
        const {data} = await api.processSeat(bookingDetail);
            if(!data){
                dispatch({type:"STORE_DETAILS", payload:data});
                dispatch({type:"EMPTY_SEAT", payload:data})
            }
            else{
                dispatch({type:"SEAT_PROCESS", payload:bookingDetail})
            }
        }catch(err){
            console.log(err);
        }
}

export const bookSeat = (bookingDetail) => async(dispatch) => {
    console.log(bookingDetail);
    try{
        const {data} = await api.processSeat(bookingDetail);
            if(!data){
                dispatch({type:"STORE_DETAILS", payload:data});
                dispatch({type:"EMPTY_SEAT", payload:data})
            }
            else{
                dispatch({type:"SEAT_BOOKED", payload:bookingDetail})
            }
        }catch(err){
            console.log(err);
        }
}

export const emptySeat = (seatId,shopId) => async(dispatch) => {
    // console.log(shopId,seatId)
    try{
        await api.emptySeat(seatId,shopId);
        dispatch({type:"EMPTY_SEAT", payload:seatId})
    }catch(err){
        console.log(err);
    }
}