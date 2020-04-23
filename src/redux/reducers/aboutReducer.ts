import {SET_ABOUT, SET_IS_CHANGED_ABOUT,
    SET_DEFAULT_ABOUT, SET_ABOUT_IS_SHOW_SPINNER} from "../actions/types"
import {AboutType} from "../../tstypes/aboutTypes"

let initialState = {
    about: [] as Array<AboutType>,
    isChangedAbout: false,
    isShowSpinner: true
}

export type InitialStateType = typeof initialState
const about_reducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_ABOUT: {
            return {
                ...state, about: action.payload
            }
        }
        case SET_IS_CHANGED_ABOUT: {
            return {
                ...state, isChangedAbout: action.payload
            }
        }
        case SET_DEFAULT_ABOUT: {
            return {
                ...state, about: [{
                    _id: '0', text: 'Страница о компании ' +
                        '!!!ВНИМАНИЕ!!! Если страница о компании не отобразилась обновите страницу.'
                }]
            }
        }
        case SET_ABOUT_IS_SHOW_SPINNER:{
            return {
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default about_reducer