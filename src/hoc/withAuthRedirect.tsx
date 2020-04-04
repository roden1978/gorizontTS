import React, {ComponentType} from 'react'
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {AppStateType} from "../redux/store";

type MapStateToPropsType = {
    adminMode: boolean
    adminRoot: boolean
}
export const withAuthRedirect = (Component: ComponentType) => {

    let mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => ({
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot
    })

    class RedirectComponent extends React.Component<MapStateToPropsType> {
        render() {
            if (!this.props.adminMode && !this.props.adminRoot){
                return (<Redirect to ='/admin'/>)
            }
            return <Component {...this.props} />
        }
    }


    let ConnectedAuthRedirectComponent = connect<MapStateToPropsType, {}, {}, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
