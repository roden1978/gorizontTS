import {SET_ADMIN_MODE, SET_IS_USERS} from "../actions/types";

let initialState = {
    isAuthorized: false,
    adminMode: false,
    adminRoot: false,
    isUsers: false
}

export type InitialStateType = typeof initialState

const auth_reducer = (state = initialState, action: any): InitialStateType => {

    //debugger
    switch (action.type) {
       /* case SET_AUTHORIZED: {
            /!*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*!/
            return {
                ...state, isAuthorized: action.payload
            };
        }*/
            case SET_ADMIN_MODE: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, adminMode: action.payload, adminRoot: action.adminRoot
            };
        }
        case SET_IS_USERS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, isUsers: action.payload
            };
        }
        default:
            return state;
    }
}

export default auth_reducer;