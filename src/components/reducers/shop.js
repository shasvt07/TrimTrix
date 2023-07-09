const shopReducer = (state = {shop:null}, action) => {
    switch(action.type){
        case "STORE_DETAILS":
            return {...state, shop:action.payload};
        
        case "SEAT_PROCESS":
            const seatInfo = action.payload;
            // console.log(seatInfo)
            const newlobby = state.shop.lobby.map(seat =>{
                if(seat._id == seatInfo.seatId){
                    return {...seat, 
                        personId:seatInfo.customerId,
                        bookedServices : seatInfo.services,
                        status : seatInfo.status,
                        bookingTime : null,
                        cost:0
                    }
                }
                return seat;
            })
        return {...state , shop:{...state.shop, lobby:newlobby}}

        case "SEAT_BOOKED":
            const seatInfo1 = action.payload;
            // console.log(seatInfo)
            const newlobby1 = state.shop.lobby?.map(seat =>{
                if(seat._id === seatInfo1.seatId){
                    return {...seat, 
                        personId:seatInfo1.customerId,
                        bookedServices : seatInfo1.services,
                        status : seatInfo1.status,
                        bookingTime : seatInfo1.bookingTime,
                        cost:seatInfo1.cost
                    }
                }
                return seat;
            })
        return {...state , shop:{...state.shop, lobby:newlobby1}}
        
        case "EMPTY_SEAT":
            const seatId = action.payload;
            const updatedlobby = state.shop.lobby?.map(seat =>{
                if(seat._id === seatId){
                    return {...seat, 
                        personId:null,
                        bookedServices : null,
                        status : "free",
                        bookingTime : null,
                        cost:0
                    }
                }
            return seat;
        })

        return {...state , shop:{...state.shop, lobby:updatedlobby}}

        
        default:
            return state;
    }
    
}

export default shopReducer;