import {mongodbAPI} from '../../api/api'
import {
    SET_USERS, CHANGE_USERS_ITEM, SET_USERS_ITEM,
    SET_CURRENT_USERS_ID, SET_USERS_COUNT, IS_ALL_USERS,
    SET_DEFAULT_USER, CREATE_USER_SUCCESS, SET_ADMIN_ROOT_COUNT,
    IS_ADMIN_ROOT_COUNT
} from "./types"
import {UsersType} from "../../tstypes/usersTypes"
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";

export type UsersActionsType = SetUsersActionType | SetAdminRootCountActionType | SetIsAllUsersActionType |
    SetIsAdminRootCountActionType | SetChangeUsersItemActionType | SetUserItemActionType |
    SetCurrentUsersIdActionType | SetUsersCountActionType | SetDefaultUserActionType | SetCreateUserSuccessActionType

export type SetUsersActionType = {
    type: typeof SET_USERS
    payload: Array<UsersType>
}
/*Создаем объект action с обязательным свойством type*/
export const setUsers = (users: Array<UsersType>): SetUsersActionType => {
    return {
        type: SET_USERS,
        payload: users
    }
}

export type SetAdminRootCountActionType = {
    type: typeof SET_ADMIN_ROOT_COUNT,
    payload: number
}
export const setAdminRootCount = (count: number): SetAdminRootCountActionType => {
    return {
        type: SET_ADMIN_ROOT_COUNT,
        payload: count
    }
}

export type SetIsAllUsersActionType = {
    type: typeof IS_ALL_USERS
    payload: boolean
}
export const setIsAllUsers = (isAllUsers: boolean): SetIsAllUsersActionType =>{
    return{
        type: IS_ALL_USERS,
        payload: isAllUsers
    }
}

export type SetIsAdminRootCountActionType = {
    type: typeof IS_ADMIN_ROOT_COUNT
    payload: boolean
}
export const setIsAdminRootCount = (isAdminRootCount: boolean): SetIsAdminRootCountActionType =>{
    return{
        type: IS_ADMIN_ROOT_COUNT,
        payload: isAdminRootCount
    }
}

export type SetChangeUsersItemActionType = {
    type: typeof CHANGE_USERS_ITEM
}
export const setChangeUsersItem = (): SetChangeUsersItemActionType =>{
    return{
        type: CHANGE_USERS_ITEM
    }
}

export type SetUserItemActionType = {
    type: typeof SET_USERS_ITEM
    payload: boolean
}

export const setUserItem = (isSetUserItem: boolean): SetUserItemActionType =>{
    return {
        type: SET_USERS_ITEM,
        payload: isSetUserItem
    }
}

export type SetCurrentUsersIdActionType = {
    type: typeof SET_CURRENT_USERS_ID
    payload: string
}
export const setCurrentUsersId = (id: string): SetCurrentUsersIdActionType =>{
    return {
        type: SET_CURRENT_USERS_ID,
        payload: id
    }
}

export type SetUsersCountActionType = {
    type: typeof SET_USERS_COUNT
    payload: number
}
export const setUsersCount = (count: number): SetUsersCountActionType =>{
    return {
        type: SET_USERS_COUNT,
        payload: count
    }
}

export type SetDefaultUserActionType = {
    type: typeof SET_DEFAULT_USER
}
export const setDefaultUser = (): SetDefaultUserActionType =>{
    return{
        type: SET_DEFAULT_USER
    }
}

export type SetCreateUserSuccessActionType = {
    type: typeof CREATE_USER_SUCCESS
    payload: boolean
}
export const setCreateUserSuccess = (success: boolean): SetCreateUserSuccessActionType =>{
    return {
        type: CREATE_USER_SUCCESS,
        payload: success
    }
}

export type UsersThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionsType>

/*Thunk Creators*/
export const getUsers = (): UsersThunkActionType => {
    return async (dispatch) => {
        const users = await mongodbAPI.getUsers()
        dispatch(setUsers(users))
    }
}

export const getAdminRootCount = (): UsersThunkActionType =>{
    return async (dispatch) => {
        const count = await mongodbAPI.getAdminRootCount()
        dispatch(setAdminRootCount(count))
    }
}


export const createUser = (firstName: string, lastName: string, email: string,
                           password: string, root: boolean): UsersThunkActionType =>{

    return async (dispatch) =>{
        const data = await mongodbAPI.createUser({firstName, lastName, email, password, root})
        if (data === false) {
            alert(`ОШИБКА!!!: Пользователь ${email} уже есть в БД!`)
        }
        else{
            //dispatch(setCreateUserSuccess(true))
            alert(`Пользователь ${email} успешно добавлен в БД!`)
            dispatch(getUsers())
        }
    }
}

export const updateUser = (id: string, firstName: string, lastName: string,
                           email: string, password: string, root: boolean): UsersThunkActionType =>{

    return async (dispatch) =>{
        const data = await mongodbAPI.updateUser({id, firstName, lastName, email, password, root})
        if (data) {
            dispatch(getUsers())
        }
    }
}

export const deleteUser = (id: string): UsersThunkActionType =>{

    return async (dispatch) =>{
        const data = await mongodbAPI.deleteUser({id})
        if (data) {
            dispatch(getUsers())
        }
    }
}



