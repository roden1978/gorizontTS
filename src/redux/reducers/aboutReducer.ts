import {SET_ABOUT, SET_IS_CHANGED_ABOUT, SET_DEFAULT_ABOUT} from "../actions/types"
import {AboutType} from "../../tstypes/aboutTypes"

let initialState = {
    about: [] as Array<AboutType>,
    isChangedAbout: false
}

export type InitialStateType = typeof initialState
const about_reducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_ABOUT: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
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
                    _id: '0', text: 'Страницу о компании ' +
                        '!!!ВНИМАНИЕ!!! Если страница о компании не отобразилась обновите страницу.'
                }]
            }
        }
        default:
            return state
    }
}

export default about_reducer