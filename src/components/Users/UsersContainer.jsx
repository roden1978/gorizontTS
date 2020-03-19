import React from 'react';
import {
    getUsers,
    setUserItem,
    setChangeUsersItem,
    setCurrentUsersId,
    createUser,
    updateUser,
    deleteUser,
    setIsAllUsers,
    setUsersCount,
    setDefaultUser,
    setCreateUserSuccess,
    getAdminRootCount,
    setIsAdminRootCount,
    setAdminRootCount
} from '../../redux/actions/usersActions';
import Users from "./Users";
import {connect} from "react-redux";
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
class UsersContainer extends React.Component {

    componentDidMount() {
        //debugger
        if (this.props.adminMode){
            this.props.getUsers();
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
//debugger
        if (this.props.getUserItem) {
            this.props.setChangeUsersItem();
            this.props.setUserItem(false);
        }

        if (this.props.isAllUsers && this.props.adminMode) {
            setTimeout(null, 2000);
            this.props.getUsers();
            this.props.setIsAllUsers(false);
        }
        if( this.props.users.length === 0){
            this.props.setDefaultUser();
        }

        if(this.props.isAdminRootCount){
            this.props.getAdminRootCount();
        }
    }

    render() {
        return (<Users users={this.props.users}
                       {...this.props}
        />)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        isAllUsers: state.users.isAllUsers,
        getUserItem: state.users.getUserItem,
        currentUserId: state.users.currentUserId,
        usersCount: state.users.usersCount,
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot,
        createUserSuccess: state.users.createUserSuccess,
        adminRootCount: state.users.adminRootCount,
        isAdminRootCount: state.users.isAdminRootCount
    }
};
/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default compose(connect(mapStateToProps,
    {
        getUsers,
        setUserItem,
        setChangeUsersItem,
        setCurrentUsersId,
        createUser,
        updateUser,
        deleteUser,
        setIsAllUsers,
        setUsersCount,
        setDefaultUser,
        setCreateUserSuccess,
        getAdminRootCount,
        setIsAdminRootCount,
        setAdminRootCount
    }), withAuthRedirect)(UsersContainer);