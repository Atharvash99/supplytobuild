import { USER_REGISTER_FAILED, USER_REGISTER_SUCCESS } from "../action/types";

export const userRegisterReducer = (state = { user: '' },action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return { user: action.payload }
        case USER_REGISTER_FAILED:
            return {error:action.payload}
        default:
            return state;
    }
}