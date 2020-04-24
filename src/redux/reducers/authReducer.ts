import {AuthActionsType} from "../actions/authActions";

let initialState = {
    isAuthorized: false,
    adminMode: false,
    adminRoot: false,
    isUsers: false
}

export type InitialStateType = typeof initialState

const auth_reducer = (state = initialState, action: AuthActionsType): InitialStateType => {

    switch (action.type) {
        case "GT/AUTH/SET_ADMIN_MODE": {
            return {
                ...state, adminMode: action.payload, adminRoot: action.adminRoot
            }
        }
        case "GT/US/SET_IS_USERS": {
            return {
                ...state, isUsers: action.payload
            }
        }
        default:
            return state
    }
}

export default auth_reducer