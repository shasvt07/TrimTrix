import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerAuthReducer = (state= {user:null}, action) =>{
    switch(action.type){
        case "AUTH":
            console.log("this is reducer: ", action.payload)
            AsyncStorage.setItem('user', JSON.stringify(action.payload));
            return {...state, user:action.data,}

        case "LOGOUT":
            AsyncStorage.clear()
            return {...state, user:null};

        default:
            return state;

    }
};

export default CustomerAuthReducer;