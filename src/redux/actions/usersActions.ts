import {mongodbAPI} from '../../api/api'
import {UsersType} from "../../tstypes/usersTypes"
import {ThunkAction} from "redux-thunk";
import {ActionsTypes, AppStateType} from "../store";

export type UsersActionsType = ActionsTypes<typeof userActions>
export const userActions = {
    setUsers: (users: Array<UsersType>) => (
        {
            type: 'GT/US/SET_USERS',
            payload: users
        } as const
    ),
    setAdminRootCount: (count: number) => (
        {
            type: 'GT/US/SET_ADMIN_ROOT_COUNT',
            payload: count
        } as const
    ),
    setIsAllUsers: (isAllUsers: boolean) => (
        {
            type: 'GT/US/IS_ALL_USERS',
            payload: isAllUsers
        } as const
    ),
    setIsAdminRootCount: (isAdminRootCount: boolean) => (
        {
            type: 'GT/US/IS_ADMIN_ROOT_COUNT',
            payload: isAdminRootCount
        } as const
    ),
    setChangeUsersItem: () => (
        {
            type: 'GT/US/CHANGE_USERS_ITEM'
        } as const
    ),
    setUserItem: (isSetUserItem: boolean) => (
        {
            type: 'GT/US/SET_USERS_ITEM',
            payload: isSetUserItem
        } as const
    ),
    setCurrentUsersId: (id: string) => (
        {
            type: 'GT/US/SET_CURRENT_USERS_ID',
            payload: id
        } as const
    ),
    setUsersCount: (count: number) => (
        {
            type: 'GT/US/SET_USERS_COUNT',
            payload: count
        } as const
    ),
    setDefaultUser: () => (
        {
            type: 'GT/US/SET_DEFAULT_USER'
        } as const
    ),
    setCreateUserSuccess: (success: boolean) => (
        {
            type: 'GT/US/CREATE_USER_SUCCESS',
            payload: success
        } as const
    )
}



export type UsersThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionsType>

/*Thunk Creators*/
export const getUsers = (): UsersThunkActionType => {
    return async (dispatch) => {
        const users = await mongodbAPI.getUsers()
        if(users)
        dispatch(userActions.setUsers(users))
    }
}

export const getAdminRootCount = (): UsersThunkActionType =>{
    return async (dispatch) => {
        const count = await mongodbAPI.getAdminRootCount()
        if(count)
        dispatch(userActions.setAdminRootCount(count))
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
            alert(`Пользователь ${email} успешно добавлен в БД!`)
            dispatch(getUsers())
        }
    }
}

export const updateUser = (_id: string, firstName: string, lastName: string,
                           email: string, password: string, root: boolean): UsersThunkActionType =>{

    return async (dispatch) =>{
        const data = await mongodbAPI.updateUser({_id, firstName, lastName, email, password, root})
        if (data) {
            dispatch(getUsers())
        }
    }
}

export const deleteUser = (_id: string): UsersThunkActionType =>{

    return async (dispatch) =>{
        const data = await mongodbAPI.deleteUser(_id)
        if (data) {
            dispatch(getUsers())
        }
    }
}



