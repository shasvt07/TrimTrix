const shopListReducer = (state = { shopList:[] ,isLoading:true}, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };

        case "FETCH_SHOPS":
            return { ...state, shopList: action.payload};

        case "SHOP_STATUS":
            const newshopList = state.shopList.map((shop) =>{
                if(shop._id === action.payload.shopId){
                    return {...shop, isOpen: action.payload.openClose}
                }
                return shop;
            })
            // console.log("reducers",newshopList);
            return {...state, newshopList};
            

        default:
            return state;
    }
}

export default shopListReducer;