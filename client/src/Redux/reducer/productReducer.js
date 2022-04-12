import { FETCH_PRODUCTS_REQUEST,FETCH_PRODUCTS_FAILED, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_FAILED, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "../action/types"

export const productReducer = (state={products:[]},action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { loading: true, products: [] }
        case FETCH_PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload }
        case FETCH_PRODUCTS_FAILED:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}
export const singleProductReducer = (state = { product: {images:[]} }, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return{loading:true,product:[]}
        case FETCH_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload }
        case FETCH_PRODUCT_FAILED:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}