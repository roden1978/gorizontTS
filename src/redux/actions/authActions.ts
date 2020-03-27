import {mongodbAPI} from '../../api/api'
import {SET_ADMIN_MODE, SET_IS_USERS} from "./types"
import {FormAction, stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store"

type AuthActionsType = SetAdminModeActionType | SetIsUsersActionType | FormAction

export type SetAdminModeActionType = {
    type: typeof SET_ADMIN_MODE
    payload: boolean
    adminRoot: boolean
}
export const setAdminMode = (adminMode: boolean, adminRoot: boolean): SetAdminModeActionType => {
    return {
        type: SET_ADMIN_MODE,
        payload: adminMode,
        adminRoot: adminRoot
    }
}

export type SetIsUsersActionType = {
    type: typeof SET_IS_USERS
    payload: boolean
}
export const setIsUsers = (isUsers: boolean): SetIsUsersActionType => {
    return {
        type: SET_IS_USERS,
        payload: isUsers
    }
}

type AuthThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionsType>

export const checkUser = (email: string, password: string, newUsers: boolean): AuthThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.checkUser({email, password})
        if (data) {
            if (!data.root && newUsers)
                dispatch(stopSubmit('LoginForm', {email: "У вас нет прав на администрирование пользователей"}))
            else
                dispatch(setAdminMode(true, data.root))
        } else {
            dispatch(stopSubmit('LoginForm', {password: "Не верный логин или пароль"}))
        }
    }
}
