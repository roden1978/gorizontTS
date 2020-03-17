import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {
    //debugger
    let mapStateToPropsForRedirect = (state) => ({
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot
    });

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.adminMode && !this.props.adminRoot){
                return (<Redirect to ='/admin'/>);
            }
            return <Component {...this.props} />
        }
    }


    let ConnectedAuthRedirectComponent = connect (mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}