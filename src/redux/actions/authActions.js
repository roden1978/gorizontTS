import {mongodbAPI} from '../../api/api'
import {SET_ADMIN_MODE, SET_IS_USERS} from "./types";
import {stopSubmit} from "redux-form";

export const setAdminMode = (adminMode, adminRoot) => {
    return {
        type: SET_ADMIN_MODE,
        payload: adminMode,
        adminRoot: adminRoot
    }
}

export const setIsUsers = (isUsers) => {
    return {
        type: SET_IS_USERS,
        payload: isUsers
    }
}

export const checkUser = (email, password, newUsers) => {
    //debugger
    return async (dispatch) => {
        const data = await mongodbAPI.checkUser({email, password});
        if (data) {
            if (!data.root && newUsers)
                dispatch(stopSubmit('LoginForm', {email: "У вас нет прав на администрирование пользователей"}))
            else
                dispatch(setAdminMode(true, data.root));
        } else {
            dispatch(stopSubmit('LoginForm', {password: "Не верный логин или пароль"}))
        }
    }
}
