import { createStore, combineReducers, applyMiddleware } from 'redux'
import { productReducer, singleProductReducer } from './reducer/productReducer'
import thunk from 'redux-thunk'
import { cartReducer } from './reducer/cartReducer'
import { userRegisterReducer } from './reducer/userReducer'
const Reducer = combineReducers({
    productReducer: productReducer,
    singleProductReducer: singleProductReducer,
    cartReducer: cartReducer,
    userRegisterReducer:userRegisterReducer
})
const store = createStore(Reducer, applyMiddleware(thunk))
export default store