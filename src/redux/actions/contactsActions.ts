import {mongodbAPI} from '../../api/api'
import {SET_CONTACTS, SET_IS_CHANGED_CONTACTS, SET_DEFAULT_CONTACTS} from "./types";
import {ContactsType} from "../../tstypes/contactsTypes";

export type SetContactsActionType = {
    type: typeof SET_CONTACTS
    payload: Array<ContactsType>
}
export const setContacts = (contacts: Array<ContactsType>): SetContactsActionType => {
    return {
        type: SET_CONTACTS,
        payload: contacts
    }
}

export type SetIsChangedContactsActionType = {
    type: typeof SET_IS_CHANGED_CONTACTS
    payload: boolean
}
export const setIsChangedContacts = (isChangedContacts: boolean): SetIsChangedContactsActionType => {
    return {
        type: SET_IS_CHANGED_CONTACTS,
        payload: isChangedContacts
    }
}

export type SetDefaultContactsActionType = {
    type: typeof SET_DEFAULT_CONTACTS
}
export const setDefaultContacts = (): SetDefaultContactsActionType => {
    return {
        type: SET_DEFAULT_CONTACTS
    }
}

/*Thunk Creators*/
export const getContacts = () => {
    return async (dispatch: any) => {
        const contacts = await mongodbAPI.getContacts();
        dispatch(setContacts(contacts));
    }
}
export const createContacts = (companyName: string, companyAddress: string, companyEmail: string, companyPhone: string,
                               phoneOwner01: string, phone01: string, phoneOwner02: string, phone02: string,
                               phoneOwner03: string, phone03: string, phoneOwner04: string, phone04: string,
                               phoneOwner05: string, phone05: string) =>{
    //debugger
    return async (dispatch: any) =>{
        const data = await mongodbAPI.createContacts({companyName, companyAddress,
            companyEmail, companyPhone,
            phoneOwner01, phone01, phoneOwner02, phone02,
            phoneOwner03, phone03, phoneOwner04, phone04,
            phoneOwner05, phone05});
        if (data.resultCode === 0) {
            dispatch(getContacts());
        }
    }
}

export const updateContacts = (id: string, companyName: string, companyAddress: string,
                               companyEmail: string, companyPhone: string,
                               phoneOwner01: string, phone01: string, phoneOwner02: string, phone02: string,
                               phoneOwner03: string, phone03: string, phoneOwner04: string, phone04: string,
                               phoneOwner05: string, phone05: string) => {
    //debugger
    return async (dispatch:any) => {
        const data = await mongodbAPI.updateContacts({
            id, companyName, companyAddress, companyEmail, companyPhone,
            phoneOwner01, phone01, phoneOwner02, phone02,
            phoneOwner03, phone03, phoneOwner04, phone04,
            phoneOwner05, phone05
        });
        if (data.resultCode === 0) {
            dispatch(getContacts());
        }
    }
}
