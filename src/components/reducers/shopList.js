const shopListReducer = (state = { shopList:[] ,isLoading:true}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };

        case "FETCH_SHOPS":
            return { ...state, shopList: action.payload};

        case "SHOP_STATUS":
            return {...state, shopList:state.shopList.map((shop) => shop._id === action.payload._id ? action.payload : shop)}
            
        default:
            return state;
    }
}

export default shopListReducer;