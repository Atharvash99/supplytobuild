import axios from 'axios'
import { ADD_TO_CART, REMOVE_FROM_CART } from '../action/types'
export const addtocart = (id, qty) => async (dispatch,getState) => {
    const { data } = await axios.get(`/api/product/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            countInStock: data.InStock,
            qty
        }
        
    })
    localStorage.setItem('cart',JSON.stringify(getState().cartReducer.cartItems))
}
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload:id 
    })
    localStorage.setItem('cart',JSON.stringify(getState().cartReducer.cartItems))
}