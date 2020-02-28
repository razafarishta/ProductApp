import React from 'react'
import {createStore , combineReducers, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import ShopNavigator from './src/navigation/ShopNavigator';
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({

  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer

});
const store =createStore(rootReducer, applyMiddleware(ReduxThunk));
 export default function App() {
 
    return(
      <Provider store= {store} >
      <ShopNavigator />
      </Provider>
);
  

} 