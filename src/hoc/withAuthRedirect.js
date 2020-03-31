import React from 'react'
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
/*import {AppStateType} from "../redux/store";

type MapStateToPropsType = {
    adminMode: boolean
    adminRoot: boolean
}
/!*

type PropsType ={
    Component: React.Component<any>
}
*!/

export const withAuthRedirect = <P extends object>(Component: React.ComponentType<P>) => {

    let mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsType => ({
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot
    })

    class RedirectComponent extends React.Component<MapStateToPropsType & P> {
        render() {
            if (!this.props.adminMode && !this.props.adminRoot)
                return (<Redirect to = '/admin' / >)

            return <Component {...this.props as P}/>
        }
    }


    let ConnectedAuthRedirectComponent = connect<MapStateToPropsType, {}, {}, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}*/

export const withAuthRedirect = (Component) => {

    let mapStateToPropsForRedirect = (state) => ({
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot
    })

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.adminMode && !this.props.adminRoot){
                return (<Redirect to ='/admin'/>)
            }
            return <Component {...this.props} />
        }
    }


    let ConnectedAuthRedirectComponent = connect (mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
