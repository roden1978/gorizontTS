import {SET_ABOUT, SET_IS_CHANGED_ABOUT, SET_DEFAULT_ABOUT} from "../actions/types";

let initialState = {
    about: [],
    isChangedAbout: false
}

const about_reducer = (state = initialState, action) => {

    //let copyState;// = {...state};

    //debugger
    switch (action.type) {
        case SET_ABOUT: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, about: action.payload
            };
        }
        case SET_IS_CHANGED_ABOUT: {
            return {
                ...state, isChangedAbout: action.payload
            };
        }
        case SET_DEFAULT_ABOUT:{
            return {
                ...state, about: [{_id: '0', text: 'Войдите в панель администирования и создайте контакты ' +
                        '!!!ВНИМАНИЕ!!! Если страница контактов не отобразилась обновите страницу.'}]
            }
        }
        default:
            return state;
    }
}

export default about_reducer;