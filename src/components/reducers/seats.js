const seatsReducer = (state = {seats:[]}, action) => {
    switch(action.type){
        case 'SET_SEATS':
            return {...state, seats:action.payload}
            
        case 'ADD_SEAT':
            return {...state, seats:[...state.seats, action.payload]};
        
        case 'REMOVE_SEAT':
            return {...state, seats:state.seats.filter( (_,i) => 
                i !== state.seats.length-1
            ),}
        
        default:
            return state;
    }
}

export default seatsReducer;