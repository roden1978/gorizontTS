import {mongodbAPI} from '../../api/api'
import {SET_ABOUT, SET_IS_CHANGED_ABOUT,
    SET_DEFAULT_ABOUT, SET_ABOUT_IS_SHOW_SPINNER} from "./types"
import {AboutType} from "../../tstypes/aboutTypes"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store"


type AboutActionsType = SetAboutActionType | SetIsChangedAboutActionType | SetDefaultAboutActionType

export type SetAboutActionType = {
    type: typeof SET_ABOUT
    payload: Array<AboutType>
}
/*Создаем объект action с обязательным свойством type*/
export const setAbout = (about: Array<AboutType>): SetAboutActionType => {
    return {
        type: SET_ABOUT,
        payload: about
    }
}

export type SetIsChangedAboutActionType = {
    type: typeof SET_IS_CHANGED_ABOUT
    payload: boolean
}
export const setIsChangedAbout = (isChangedAbout: boolean): SetIsChangedAboutActionType => {
    return {
        type: SET_IS_CHANGED_ABOUT,
        payload: isChangedAbout
    }
}

export type SetDefaultAboutActionType = {
    type: typeof SET_DEFAULT_ABOUT
}
export const setDefaultAbout = (): SetDefaultAboutActionType =>{
    return{
        type: SET_DEFAULT_ABOUT
    }
}

export type SetAboutIsShowSpinner = {
    type: typeof SET_ABOUT_IS_SHOW_SPINNER
    payload: boolean
}

export const setIsShowSpinner = (isShowSpinner: boolean): SetAboutIsShowSpinner =>{
    return {
        type: SET_ABOUT_IS_SHOW_SPINNER,
        payload: isShowSpinner
    }
}

type AboutThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AboutActionsType>
/*Thunk Creators*/
export const getAbout = (): AboutThunkType => {
    return async (dispatch) => {
        const about = await mongodbAPI.getAbout()
        if(about)
        dispatch(setAbout(about))
    }
}

export const updateAbout = (_id: string, text: string): AboutThunkType =>{
    return async (dispatch) =>{
        const data = await mongodbAPI.updateAbout({_id, text})
        if (data.resultCode === 0) {
            dispatch(getAbout())
        }
    }
}

export const createAbout = (text: string): AboutThunkType =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.createAbout({text})
        if (data.resultCode === 0) {
            dispatch(getAbout())
        }
    }
}
