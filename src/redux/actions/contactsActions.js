import {mongodbAPI} from '../../api/api'
import {SET_CONTACTS, SET_IS_CHANGED_CONTACTS, SET_DEFAULT_CONTACTS} from "./types";

/*Создаем объект action с обязательным свойством type*/
export const setContacts = (contacts) => {
    return {
        type: SET_CONTACTS,
        payload: contacts
    }
}
export const setIsChangedContacts = (isChangedContacts) => {
    return {
        type: SET_IS_CHANGED_CONTACTS,
        payload: isChangedContacts
    }
}
export const setDefaultContacts = () => {
    return {
        type: SET_DEFAULT_CONTACTS
    }
}
/*Thunk Creators*/
export const getContacts = () => {
    return async (dispatch) => {
        const contacts = await mongodbAPI.getContacts();
        dispatch(setContacts(contacts));
    }
}
export const createContacts = (companyName, companyAddress, companyEmail, companyPhone,
                               phoneOwner01, phone01, phoneOwner02, phone02,
                               phoneOwner03, phone03, phoneOwner04, phone04,
                               phoneOwner05, phone05) =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.createContacts({companyName, companyAddress, companyEmail, companyPhone,
            phoneOwner01, phone01, phoneOwner02, phone02,
            phoneOwner03, phone03, phoneOwner04, phone04,
            phoneOwner05, phone05});
        if (data.resultCode === 0) {
            dispatch(getContacts());
        }
    }
}

export const updateContacts = (id, companyName, companyAddress, companyEmail, companyPhone,
                               phoneOwner01, phone01, phoneOwner02, phone02,
                               phoneOwner03, phone03, phoneOwner04, phone04,
                               phoneOwner05, phone05) => {
    //debugger
    return async (dispatch) => {
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
