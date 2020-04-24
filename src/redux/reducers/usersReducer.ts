import {UsersType} from "../../tstypes/usersTypes"
import {UsersActionsType} from "../actions/usersActions";

let initialState = {
    users: [] as Array<UsersType>,
    isGetUserItem: false,
    isAllUsers: false,
    currentUserId: '',
    usersCount: 0,
    createUserSuccess: false,
    adminRootCount: 0,
    isAdminRootCount: false
}

export type InitialStateType = typeof initialState
const users_reducer = (state = initialState, action: UsersActionsType):InitialStateType => {

    switch (action.type) {
        case "GT/US/SET_USERS": {
            return {
                ...state, users: action.payload
            }
        }
        case  "GT/US/SET_USERS_ITEM":{
            return {
                ...state, isGetUserItem: action.payload
            }
        }
        case  "GT/US/IS_ALL_USERS":{
            return {
                ...state, isAllUsers: action.payload
            }
        }
        case  "GT/US/IS_ADMIN_ROOT_COUNT":{
            return {
                ...state, isAdminRootCount: action.payload
            }
        }
        case "GT/US/CHANGE_USERS_ITEM":{
            const usersItem  = state.users.find((user: UsersType) =>user._id === state.currentUserId)
            return {
                ...state, users: [usersItem as UsersType]
            }
        }
        case "GT/US/SET_CURRENT_USERS_ID" :{
            return{
                ...state, currentUserId: action.payload
            }
        }
        case "GT/US/SET_USERS_COUNT" :{
            return{
                ...state, usersCount: action.payload
            }
        }
        case "GT/US/SET_ADMIN_ROOT_COUNT" :{
            return{
                ...state, adminRootCount: action.payload
            }
        }
        case "GT/US/SET_DEFAULT_USER" :{
            return{
                ...state, users: [{_id: '0', firstName: 'Создайте первого пользователя',
                    lastName: '!!!ВНИМАНИЕ!!! Если созданный пользователь не отобразился обновите страницу.',
                    email: '', password: '', root: false}]
            }
        }
        case "GT/US/CREATE_USER_SUCCESS":{
            return {
                ...state, createUserSuccess: action.payload
            }
        }

        default:
            return state
    }
}

export default users_reducer