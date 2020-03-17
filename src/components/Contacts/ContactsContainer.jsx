import React from 'react';
import {
    getContacts, createContacts, updateContacts, setIsChangedContacts,
    setDefaultContacts
} from '../../redux/actions/contactsActions';
import Contacts from "./Contacts";
import {connect} from "react-redux";
import Spinner from "../../common/Spinner";

class ContactsContainer extends React.Component {

    componentDidMount() {
        //debugger
       this.props.getContacts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //debugger
        if (this.props.isChangedContacts) {
            setTimeout(null, 2000);
            this.props.getContacts();
            this.props.setIsChangedContacts(false);
        }
        if (this.props.contacts.length === 0) {
            this.props.setDefaultContacts();
        }
    }

    render() {
        return (
            <>
                {this.props.contacts.length === 0 ? <Spinner/> : null}
                <Contacts {...this.props} />
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
    return {
        contacts: state.contacts.contacts,
        isChangedContacts: state.contacts.isChangedContacts,
        adminMode: state.auth.adminMode
    }
};

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect(mapStateToProps, {
    getContacts, createContacts, updateContacts,
    setIsChangedContacts, setDefaultContacts
})(ContactsContainer);

/*
contacts = {this.props.contacts}
                          updateContacts = {this.props.updateContacts}
                          createContacts = {this.props.createContacts}
                          setIsChangedContacts = {this.props.setIsChangedContacts}
                          adminMode={this.props.adminMode}
                          mobile = {this.props.mobile}
 */