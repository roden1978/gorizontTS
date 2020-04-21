import {SET_CONTACTS, SET_IS_CHANGED_CONTACTS, SET_DEFAULT_CONTACTS} from "../actions/types"
import {ContactsType} from "../../tstypes/contactsTypes"

let initialState = {
    contacts: [] as Array<ContactsType>,
    isChangedContacts: false
}

export type InitialStateType = typeof initialState

const contacts_reducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_CONTACTS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, contacts: action.payload
            }
        }
        case SET_IS_CHANGED_CONTACTS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, isChangedContacts: action.payload
            }
        }
        case SET_DEFAULT_CONTACTS:{
            return {
                ...state, contacts: [{_id: '0', companyName: 'Создайте контакты',
                    companyAddress: '!!!ВНИМАНИЕ!!! Если страница контактов не отобразилась обновите страницу.',
                    companyEmail: '', companyPhone: '', phoneOwner01: '', phone01:'',
                    phoneOwner02:'', phone02:'', phoneOwner03:'', phone03:'',
                    phoneOwner04:'', phone04:'', phoneOwner05:'', phone05:''}]
            }
        }
        default:
            return state
    }
}

export default contacts_reducer