import {mongodbAPI} from '../../api/api'
import {AboutType} from "../../tstypes/aboutTypes"
import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "../store"


export type AboutActionsType = ActionsTypes<typeof aboutActions>
export const aboutActions = {
    setAbout: (about: Array<AboutType>) => (
        {
            type: 'GT/ABOUT/SET_ABOUT',
            payload: about
        } as const
    ),
    setIsChangedAbout: (isChangedAbout: boolean) => (
        {
            type: 'GT/ABOUT/SET_IS_CHANGED_ABOUT',
            payload: isChangedAbout
        } as const

    ),
    setDefaultAbout: () => (
        {
            type: 'GT/ABOUT/SET_DEFAULT_ABOUT'
        } as const
    ),
    setIsShowSpinner: (isShowSpinner: boolean) => (
        {
            type: 'GT/ABOUT/SET_ABOUT_IS_SHOW_SPINNER',
            payload: isShowSpinner
        } as const
    )
}

type AboutThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AboutActionsType>
/*Thunk Creators*/
export const getAbout = (): AboutThunkType => {
    return async (dispatch) => {
        const about = await mongodbAPI.getAbout()
        if (about)
            dispatch(aboutActions.setAbout(about))
    }
}

export const updateAbout = (_id: string, text: string): AboutThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.updateAbout({_id, text})
        if (data.resultCode === 0) {
            dispatch(getAbout())
        }
    }
}

export const createAbout = (text: string): AboutThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.createAbout({text})
        if (data.resultCode === 0) {
            dispatch(getAbout())
        }
    }
}
