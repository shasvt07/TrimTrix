const myShopReducer = (state = { myShop: null }, action) => {
    switch (action.type) {
        case "FETCH_STORE":
            return { ...state, myShop: action.payload };

        default:
            return state;
    }
}

export default myShopReducer;