const currentlobbyReducer = (state = {currentlobby:[]}, action) => {
    switch(action.type){
        
        case 'SET_LOBBY':
            console.log(action.payload);
            return {...state, currentlobby: [...state.currentlobby, (!state.currentlobby.includes(action.payload) && action.payload)]};
        
        case 'JOB_DONE':
            return {...state, currentlobby:state.currentlobby.filter((user) => user._id == action.payload)
        }
        
        default:
            return state;
    }
}

export default currentlobbyReducer;