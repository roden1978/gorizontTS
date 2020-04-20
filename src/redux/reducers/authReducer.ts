import {SET_ADMIN_MODE, SET_IS_USERS} from "../actions/types"

let initialState = {
    isAuthorized: false,
    adminMode: true,
    adminRoot: true,
    isUsers: true
}

export type InitialStateType = typeof initialState

const auth_reducer = (state = initialState, action: any): InitialStateType => {

    //debugger
    switch (action.type) {
        case SET_ADMIN_MODE: {
            return {
                ...state, adminMode: action.payload, adminRoot: action.adminRoot
            }
        }
        case SET_IS_USERS: {
            return {
                ...state, isUsers: action.payload
            }
        }
        default:
            return state
    }
}

export default auth_reducer