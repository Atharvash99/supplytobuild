import axios from 'axios'
import { FETCH_PRODUCTS_FAILED, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_FAILED, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from './types'
export const productAction = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST })
        const { data } = await axios.get('/api/product/')
        dispatch({type:FETCH_PRODUCTS_SUCCESS,payload:data})
    }
    catch (error)
    {
        dispatch({type:FETCH_PRODUCTS_FAILED,payload:error.msg})   
    }
}
export const singleProductAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST })
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({type:FETCH_PRODUCT_SUCCESS,payload:data})
    }
    catch (error)
    {
        dispatch({type:FETCH_PRODUCT_FAILED,payload:error.msg})       
    }
}