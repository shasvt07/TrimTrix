const shopReducer = (state = {shop:null, isLoading:true}, action) => {
    switch(action.type){
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };

        case "STORE_DETAILS":
            return {...state, shop:action.payload};
        
        case "SEAT_PROCESS":
            const seatInfo = action.payload;
            // console.log(seatInfo)
            const newlobby = state.shop.lobby.map(seat =>{
                if(seat._id == seatInfo.seatId){
                    return {...seat, 
                        personId:seatInfo.personId,
                        bookedServices : seatInfo.services,
                        status : seatInfo.status,
                        bookingTime : null,
                        cost:0,
                        personName:seatInfo.name,
                        personNumber:seatInfo.phoneNumber
                    }
                }
                return seat;
            })
        return {...state , shop:{...state.shop, lobby:newlobby}, isLoading:true}

        case "SEAT_BOOKED":
            const seatInfo1 = action.payload;
            // console.log(seatInfo)
            const newlobby1 = state.shop.lobby?.map(seat =>{
                if(seat._id === seatInfo1.seatId){
                    return {...seat, 
                        personId:seatInfo1.personId,
                        bookedServices : seatInfo1.services,
                        status : seatInfo1.status,
                        bookingTime : seatInfo1.bookingTime,
                        cost:seatInfo1.cost,
                        personName:seatInfo1.personName,
                        personNumber:seatInfo1.phoneNumber
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
                        cost:0,
                        personName:"",
                        personNumber:""
                    }
                }
            return seat;
        })
        return {...state , shop:{...state.shop, lobby:updatedlobby}}

        case "OPEN_CLOSE":
            return {...state, shop:{...state.shop, isOpen:action.payload}}
        
        default:
            return state;
    }
    
}

export default shopReducer;