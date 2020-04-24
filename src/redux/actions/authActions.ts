import {mongodbAPI} from '../../api/api'
import {FormAction, stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "../store"

export type AuthActionsType = ActionsTypes<typeof authActions>
export const authActions = {
    setAdminMode:(adminMode: boolean, adminRoot: boolean) => (
        {
            type: 'GT/AUTH/SET_ADMIN_MODE',
            payload: adminMode,
            adminRoot: adminRoot
        } as const
    ),
    setIsUsers:(isUsers: boolean) => (
        {
            type: 'GT/US/SET_IS_USERS',
            payload: isUsers
        } as const
    )
}

type AuthThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionsType | FormAction>

export const checkUser = (email: string, password: string, newUsers: boolean): AuthThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.checkUser({email, password})
        if (data) {
            if (!data.root && newUsers)
                dispatch(stopSubmit('LoginForm', {email: "У вас нет прав на администрирование пользователей"}))
            else
                dispatch(authActions.setAdminMode(true, data.root))
        } else {
            dispatch(stopSubmit('LoginForm', {password: "Не верный логин или пароль"}))
        }
    }
}
