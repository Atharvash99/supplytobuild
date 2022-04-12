import axios from "axios"
import { USER_REGISTER_FAILED, USER_REGISTER_SUCCESS } from "./types"

export const userRegisterAction = (name,email,password,address) => async(dispatch) => {
    try {
        const { data } = axios.post('/api/user/register', { email, name, password, address })
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:USER_REGISTER_FAILED,payload:error.msg})
    }
}