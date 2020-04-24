import {ContactsType} from "../../tstypes/contactsTypes"
import {ContactsActionsType} from "../actions/contactsActions";

let initialState = {
    contacts: [] as Array<ContactsType>,
    isChangedContacts: false,
    isShowSpinner: true
}

export type InitialStateType = typeof initialState

const contacts_reducer = (state = initialState, action: ContactsActionsType): InitialStateType => {

    switch (action.type) {
        case "GT/CS/SET_CONTACTS": {
            return {
                ...state, contacts: action.payload
            }
        }
        case "GT/CS/SET_IS_CHANGED_CONTACTS": {
            return {
                ...state, isChangedContacts: action.payload
            }
        }
        case "GT/CS/SET_DEFAULT_CONTACTS":{
            return {
                ...state, contacts: [{_id: '0', companyName: 'Создайте контакты',
                    companyAddress: '!!!ВНИМАНИЕ!!! Если страница контактов не отобразилась обновите страницу.',
                    companyEmail: '', companyPhone: '', phoneOwner01: '', phone01:'',
                    phoneOwner02:'', phone02:'', phoneOwner03:'', phone03:'',
                    phoneOwner04:'', phone04:'', phoneOwner05:'', phone05:''}]
            }
        }
        case "GT/CS/SET_CONTACTS_IS_SHOW_SPINNER":{
            return {
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default contacts_reducer