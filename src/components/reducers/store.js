import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CustomerAuthReducer from './CustomerAuthReducer'
import seatsReducer from './seats';
import myShopReducer from './myShopReducer';
import shopReducer from './shop';
import currentlobbyReducer from './currentlobby';
import shopListReducer from './shopList';


const rootReducer = combineReducers({
  user:CustomerAuthReducer,
  seats:seatsReducer,
  myShop:myShopReducer,
  shop:shopReducer,
  currentlobby:currentlobbyReducer,
  shopList:shopListReducer

})

export const store = configureStore({
  reducer:rootReducer,
});
