import * as api from '../../api/index'

export const createBooking = async(bookingData) => {
    try{
        const {data} = await api.createBooking(bookingData);
        return data;
    }catch(err){
        console.log(err)
    }
}

export const getCustomerBookings = async(customerId) => {

    try{
        const {data} = await api.getCustomerBookings(customerId);
        return data;

    }catch(err){
        console.log(err)
    }
}

export const getBooking = async(bookinId) =>{

    try{
        const {data} = await api.getBooking(bookinId);
        return data;

    }catch(err){
        console.log(err)
    }
}

export const getOwnerBookings = async(ownerId) =>{

    try{
        const {data} = await api.getOwnerBookings(ownerId);
        return data;
    }catch(err){
        console.log(err)
    }
}


