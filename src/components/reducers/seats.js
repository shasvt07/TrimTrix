const seatsReducer = (state = {seats:[], isLoading:true}, action) => {
    switch(action.type){
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };

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