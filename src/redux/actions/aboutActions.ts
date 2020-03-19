import {mongodbAPI} from '../../api/api'
import {SET_ABOUT, SET_IS_CHANGED_ABOUT, SET_DEFAULT_ABOUT} from "./types";
import {AboutType} from "../../tstypes/aboutTypes";


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

/*Thunk Creators*/
export const getAbout = () => {
    return async (dispatch: any) => {
        const about = await mongodbAPI.getAbout();
        dispatch(setAbout(about));
    }
}

export const updateAbout = (id: string, text: string) =>{
    //debugger
    return async (dispatch: any) =>{
        const data = await mongodbAPI.updateAbout({id, text});
        if (data.resultCode === 0) {
            dispatch(getAbout());
        }
    }
}

export const createAbout = (text: string) =>{
    //debugger
    return async (dispatch:any) =>{
        const data = await mongodbAPI.createAbout({text});
        if (data.resultCode === 0) {
            dispatch(getAbout());
        }
    }
}
