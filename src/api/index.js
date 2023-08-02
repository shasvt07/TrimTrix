import axios from 'axios';

export const API = axios.create({
    baseURL:"https://trimtrixbackend.onrender.com/api",
    timeout:1000,
    header:{
        'getAccept': 'Basic Y2xpZW50OnNlY3JldA==',
        'Content-Type': 'apllication/x-www-form-urlencoded'
    }
});


export const customerRegister = (userData) => API.post("/customer/auth/register",userData);
export const customerLogin = (userData) => API.post("/customer/auth/login",userData);
export const fetchStores = () => API.get("/customer/shops");
export const fetchShopDetails = (shopId) => API.get(`/customer/shop/${shopId}`);
export const processSeat = (bookingDetail) => API.patch(`/customer/shop/${bookingDetail.shopId}/seat/${bookingDetail.seatId}`,bookingDetail);
export const emptySeat = (seatId,shopId) => API.patch(`/customer/shop/${shopId}/seat/${seatId}/empty`);



export const ownerRegister = (userData) => API.post("/owner/auth/register",userData);
export const ownerLogin = (userData) => API.post("/owner/auth/login",userData);
export const createStore = (ownerId,shopData) => API.post(`/owner/${ownerId}/createStore`,shopData);
export const fetchStore = (ownerId) => API.get(`/owner/${ownerId}/store`);
export const updateStore = (ownerId,shopData) => API.patch(`/owner/${ownerId}/store/update`,shopData);
export const fetchCustomer = (customerId) => API.get(`/owner/store/customer/${customerId}`);
export const openCloseStore = (storeId,openClose) => API.patch(`/owner/store/${storeId}/${openClose}`); 




export const createBooking = (bookingData) => API.post(`/bookings/create`,bookingData);
export const getBooking = (bookingId) => API.get(`/bookings/${bookingId}`);
export const getOwnerBookings = (ownerId) => API.get(`/bookings/owner/${ownerId}`);
export const getCustomerBookings = (customerId) => API.get(`/bookings/customer/${customerId}`);
export const getCurrentLobby = (ownerId,size) => API.get(`/bookings/owner/${ownerId}/currentLobby`); 


