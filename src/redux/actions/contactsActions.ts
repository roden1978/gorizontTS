import {mongodbAPI} from '../../api/api'
import {ContactsType} from "../../tstypes/contactsTypes"
import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "../store"

export type ContactsActionsType = ActionsTypes<typeof contactsActions>
export const contactsActions = {
    setContacts: (contacts: Array<ContactsType>) => (
        {
            type: 'GT/CS/SET_CONTACTS',
            payload: contacts
        } as const
    ),
    setIsChangedContacts: (isChangedContacts: boolean) => (
        {
            type: 'GT/CS/SET_IS_CHANGED_CONTACTS',
            payload: isChangedContacts
        } as const
    ),
    setDefaultContacts: () => (
        {
            type: 'GT/CS/SET_DEFAULT_CONTACTS'
        } as const
    ),
    setIsShowSpinner: (isShowSpinner: boolean) => (
        {
            type: 'GT/CS/SET_CONTACTS_IS_SHOW_SPINNER',
            payload: isShowSpinner
        } as const
    )
}


export type ContactsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ContactsActionsType>
/*Thunk Creators*/
export const getContacts = (): ContactsThunkType => {
    return async (dispatch) => {
        const contacts = await mongodbAPI.getContacts()
        if (contacts)
            dispatch(contactsActions.setContacts(contacts))
    }
}
export const createContacts = (companyName: string, companyAddress: string, companyEmail: string, companyPhone: string,
                               phoneOwner01: string, phone01: string, phoneOwner02: string, phone02: string,
                               phoneOwner03: string, phone03: string, phoneOwner04: string, phone04: string,
                               phoneOwner05: string, phone05: string): ContactsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.createContacts({
            companyName, companyAddress,
            companyEmail, companyPhone,
            phoneOwner01, phone01, phoneOwner02, phone02,
            phoneOwner03, phone03, phoneOwner04, phone04,
            phoneOwner05, phone05
        })
        if (data.resultCode === 0) {
            dispatch(getContacts())
        }
    }
}

export const updateContacts = (_id: string, companyName: string, companyAddress: string,
                               companyEmail: string, companyPhone: string,
                               phoneOwner01: string, phone01: string, phoneOwner02: string, phone02: string,
                               phoneOwner03: string, phone03: string, phoneOwner04: string, phone04: string,
                               phoneOwner05: string, phone05: string): ContactsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.updateContacts({
            _id, companyName, companyAddress, companyEmail, companyPhone,
            phoneOwner01, phone01, phoneOwner02, phone02,
            phoneOwner03, phone03, phoneOwner04, phone04,
            phoneOwner05, phone05
        })
        if (data.resultCode === 0) {
            dispatch(getContacts())
        }
    }
}
