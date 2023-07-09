const currentlobbyReducer = (state = {currentlobby:[]}, action) => {
    switch(action.type){
        case 'SET_LOBBY':
            return {...state, currentlobby:(!state.currentlobby.some(obj => obj._id === action.payload._id)) ? [...state.currentlobby,(action.payload)]: [...state.currentlobby]};
        
        case 'JOB_DONE':
            return {...state, currentlobby:state.currentlobby.filter((seat) => seat._id == action.payload)
        }
        
        default:
            return state;
    }
}

export default currentlobbyReducer;