import {
    SET_USERS, CHANGE_USERS_ITEM, SET_USERS_ITEM,
    SET_CURRENT_USERS_ID, SET_USERS_COUNT, IS_ALL_USERS,
    CREATE_USER_SUCCESS, SET_DEFAULT_USER, SET_ADMIN_ROOT_COUNT,
    IS_ADMIN_ROOT_COUNT
} from "../actions/types";
import {UsersType} from "../../tstypes/usersTypes";

let initialState = {
    users: [] as Array<UsersType>,
    getUserItem: false,
    isAllUsers: false,
    currentUserId: null as string | null,
    usersCount: null as number | null,
    createUserSuccess: null as boolean | null,
    adminRootCount: null as number | null,
    isAdminRootCount: false
}

export type InitialStateType = typeof initialState
const users_reducer = (state = initialState, action: any):InitialStateType => {

    switch (action.type) {
        case SET_USERS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, users: action.payload
            };
        }
        case  SET_USERS_ITEM:{
            return {
                ...state, getUserItem: action.payload
            }
        }
        case  IS_ALL_USERS:{
            return {
                ...state, isAllUsers: action.payload
            }
        }
        case  IS_ADMIN_ROOT_COUNT:{
            return {
                ...state, isAdminRootCount: action.payload
            }
        }
        case CHANGE_USERS_ITEM:{
            const usersItem  = state.users.find((user: UsersType) =>user._id === state.currentUserId)
            return {
                ...state, users: [usersItem as UsersType]
            }
        }
        case SET_CURRENT_USERS_ID :{
            return{
                ...state, currentUserId: action.payload
            }
        }
        case SET_USERS_COUNT :{
            return{
                ...state, usersCount: action.payload
            }
        }
        case SET_ADMIN_ROOT_COUNT :{
            //debugger
            return{
                ...state, adminRootCount: action.payload
            }
        }
        case SET_DEFAULT_USER :{
            return{
                ...state, users: [{_id: '0', firstName: 'Войдите в панель администирования и создайте пользователя',
                    lastName: '!!!ВНИМАНИЕ!!! Если созданный пользователь не отобразился обновите страницу.',
                    email: '', password: '', root: false}]
            }
        }
        case CREATE_USER_SUCCESS:{
            return {
                ...state, createUserSuccess: action.payload
            }
        }

        default:
            return state;
    }
}

export default users_reducer;