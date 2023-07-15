const myShopReducer = (state = { myShop: null ,isLoading:true}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };

        case "FETCH_STORE":
            return { ...state, myShop: action.payload };

        default:
            return state;
    }
}

export default myShopReducer;