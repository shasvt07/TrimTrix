import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CustomerAuthReducer from './CustomerAuthReducer'
import seatsReducer from './seats';
import myShopReducer from './myShopReducer';
import shopReducer from './shop';
import currentlobbyReducer from './currentlobby';


const rootReducer = combineReducers({
  user:CustomerAuthReducer,
  seats:seatsReducer,
  myShop:myShopReducer,
  shop:shopReducer,
  currentlobby:currentlobbyReducer

})

export const store = configureStore({
  reducer:rootReducer,
});
