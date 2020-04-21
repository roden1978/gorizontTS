import React from 'react'
import {
    getContacts, createContacts, updateContacts, setIsChangedContacts,
    setDefaultContacts
} from '../../redux/actions/contactsActions'
import Contacts from "./Contacts"
import {connect} from "react-redux"
import Spinner from "../../common/Spinner"
import {AppStateType} from "../../redux/store"
import {ContactsType} from "../../tstypes/contactsTypes"

type MapStateToPropsType = {
    contacts: Array<ContactsType>
    isChangedContacts: boolean
    adminMode: boolean
}

type MapDispatchToPropsType = {
    getContacts: () => void
    createContacts: (companyName: string, companyAddress: string, companyEmail: string, companyPhone: string,
                     phoneOwner01: string, phone01: string, phoneOwner02: string, phone02: string,
                     phoneOwner03: string, phone03: string, phoneOwner04: string, phone04: string,
                     phoneOwner05: string, phone05: string) => void
    updateContacts: (id: string, companyName: string, companyAddress: string,
                     companyEmail: string, companyPhone: string,
                     phoneOwner01: string, phone01: string, phoneOwner02: string, phone02: string,
                     phoneOwner03: string, phone03: string, phoneOwner04: string, phone04: string,
                     phoneOwner05: string, phone05: string) => void
    setIsChangedContacts: (isChangedContacts: boolean) => void
    setDefaultContacts: () => void
}

type OwnPropsType = {
    mobile: boolean
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
type PrevStateType = MapStateToPropsType

class ContactsContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getContacts()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateType) {
        if (this.props.isChangedContacts) {
            this.props.getContacts()
            this.props.setIsChangedContacts(false)
        }
        if (this.props.contacts && this.props.contacts.length === 0 && this.props.adminMode) {
            this.props.setDefaultContacts()
        }
    }

    render() {
        return (
            <>
                {!this.props.contacts && this.props.contacts!.length === 0 ? <Spinner/> : <Contacts {...this.props} />}

            </>
        )
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        contacts: state.contacts.contacts,
        isChangedContacts: state.contacts.isChangedContacts,
        adminMode: state.auth.adminMode
    }
}

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    getContacts, createContacts, updateContacts,
    setIsChangedContacts, setDefaultContacts
})(ContactsContainer)