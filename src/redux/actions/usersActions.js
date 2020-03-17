import {mongodbAPI} from '../../api/api'
import {
    SET_USERS, CHANGE_USERS_ITEM, SET_USERS_ITEM,
    SET_CURRENT_USERS_ID, SET_USERS_COUNT, IS_ALL_USERS,
    SET_DEFAULT_USER, CREATE_USER_SUCCESS, SET_ADMIN_ROOT_COUNT,
    IS_ADMIN_ROOT_COUNT
} from "./types";
//import {stopSubmit} from "redux-form";

/*Создаем объект action с обязательным свойством type*/
export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}

export const setAdminRootCount = (count) => {
    return {
        type: SET_ADMIN_ROOT_COUNT,
        payload: count
    }
}

/*Thunk Creators*/
export const getUsers = () => {
    return async (dispatch) => {
        const users = await mongodbAPI.getUsers();
        dispatch(setUsers(users));
    }
}

export const getAdminRootCount = () =>{
    return async (dispatch) => {
        const count = await mongodbAPI.getAdminRootCount();
        dispatch(setAdminRootCount(count));
    }
}


export const createUser = (firstName, lastName, email, password, root) =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.createUser({firstName, lastName, email, password, root});
        if (data === false) {
            //dispatch(setCreateUserSuccess(false));
            //dispatch(stopSubmit('EditUsersForm', {email: `Пользователь "${email}" уже есть в БД!`}));
            //
            alert(`ОШИБКА!!!: Пользователь ${email} уже есть в БД!`);
        }
        else{
            //dispatch(setCreateUserSuccess(true));
            alert(`Пользователь ${email} успешно добавлен в БД!`);
            dispatch(getUsers());
        }
    }
}

export const updateUser = (id, firstName, lastName, email, password, root) =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.updateUser({id, firstName, lastName, email, password, root});
        if (data) {
            dispatch(getUsers());
        }
    }
}

export const deleteUser = (id) =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.deleteUser({id});
        if (data) {
            dispatch(getUsers());
        }
    }
}

export const setIsAllUsers = (isAllUsers) =>{
    return{
        type: IS_ALL_USERS,
        payload: isAllUsers
    }
}

export const setIsAdminRootCount = (isAdminRootCount) =>{
    return{
        type: IS_ADMIN_ROOT_COUNT,
        payload: isAdminRootCount
    }
}

export const setChangeUsersItem = () =>{
    return{
        type: CHANGE_USERS_ITEM
    }
}

export const  setUserItem = (user) =>{
    return {
        type: SET_USERS_ITEM,
        payload: user
    }
}

export const  setCurrentUsersId = (id) =>{
    return {
        type: SET_CURRENT_USERS_ID,
        payload: id
    }
}
export const  setUsersCount = (count) =>{
    return {
        type: SET_USERS_COUNT,
        payload: count
    }
}

export const setSetDefaultUser = () =>{
    return{
        type: SET_DEFAULT_USER
    }
}
export const  setCreateUserSuccess = (value) =>{
    return {
        type: CREATE_USER_SUCCESS,
        payload: value
    }
}

