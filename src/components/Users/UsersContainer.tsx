import React, {ComponentType} from 'react'
import {
    getUsers, createUser, updateUser,
    deleteUser, getAdminRootCount, userActions
} from '../../redux/actions/usersActions'
import Users from "./Users"
import {connect} from "react-redux"
import {compose} from "redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {UsersType} from "../../tstypes/usersTypes";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    users: Array<UsersType>
    isAllUsers: boolean
    isGetUserItem: boolean
    currentUserId: string
    usersCount: number
    adminMode: boolean
    adminRoot: boolean
    createUserSuccess: boolean
    adminRootCount: number
    isAdminRootCount: boolean
}
type MapDispatchToPropsType = {
    getUsers: () => void
    setUserItem: (isSetUserItem: boolean) => void
    setChangeUsersItem: () => void
    setCurrentUsersId: (id: string) => void
    createUser: (firstName: string, lastName: string, email: string,
                 password: string, root: boolean) => void
    updateUser: (id: string, firstName: string, lastName: string,
                 email: string, password: string, root: boolean) => void
    deleteUser: (id: string) => void
    setIsAllUsers: (isAllUsers:boolean) => void
    setUsersCount: (count: number) => void
    setDefaultUser: () => void
    setCreateUserSuccess: (success: boolean) => void
    getAdminRootCount: () => void
    setIsAdminRootCount: (isAdminRootCount: boolean) => void
    setAdminRootCount: (count: number) => void
}
export type PropsType = MapStateToPropsType & MapDispatchToPropsType
type PrevStateType = MapStateToPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        if (this.props.adminMode){
            this.props.getUsers()
        }

    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateType) {
        if (this.props.isGetUserItem) {
            this.props.setChangeUsersItem()
            this.props.setUserItem(false)
        }

        if (this.props.isAllUsers && this.props.adminMode) {
            this.props.getUsers()
            this.props.setIsAllUsers(false)
        }
        if( this.props.users && this.props.users.length === 0 && this.props.adminMode){
            this.props.setDefaultUser()
        }

        if(this.props.isAdminRootCount){
            this.props.getAdminRootCount()
        }
    }

    render() {
        return (<Users users={this.props.users}
                       {...this.props}
        />)
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.users.users,
        isAllUsers: state.users.isAllUsers,
        isGetUserItem: state.users.isGetUserItem,
        currentUserId: state.users.currentUserId,
        usersCount: state.users.usersCount,
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot,
        createUserSuccess: state.users.createUserSuccess,
        adminRootCount: state.users.adminRootCount,
        isAdminRootCount: state.users.isAdminRootCount
    }
}
export default compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType,{}, AppStateType>(mapStateToProps,
    {
        getUsers, createUser, updateUser,
        deleteUser, getAdminRootCount,
        setUserItem: userActions.setUserItem,
        setChangeUsersItem: userActions.setChangeUsersItem,
        setCurrentUsersId: userActions.setCurrentUsersId,
        setIsAllUsers: userActions.setIsAllUsers,
        setUsersCount: userActions.setUsersCount,
        setDefaultUser: userActions.setDefaultUser,
        setCreateUserSuccess: userActions.setCreateUserSuccess,
        setIsAdminRootCount: userActions.setIsAdminRootCount,
        setAdminRootCount: userActions.setAdminRootCount
    }), withAuthRedirect)(UsersContainer)