import React from 'react';
import {
    getAbout, setIsChangedAbout,
    updateAbout, setDefaultAbout, createAbout
} from '../../redux/actions/aboutActions';
import AboutUs from "./AboutUs";
import {connect} from "react-redux";
import Spinner from "../../common/Spinner";

class AboutUsContainer extends React.Component {

    componentDidMount() {
        //debugger
        this.props.getAbout();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //debugger
        if (this.props.isChangedAbout) {
            setTimeout(null, 2000);
            this.props.getAbout();
            this.props.setIsChangedAbout(false);
        }
        if (this.props.about.length === 0) {
            this.props.setDefaultAbout();
        }
    }

    render() {
        return (
            <>
                {this.props.about.length === 0 ? <Spinner/> : null}
                <AboutUs {...this.props}/>
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
    return {
        about: state.about.about,
        adminMode: state.auth.adminMode,
        isChangedAbout: state.about.isChangedAbout
    }
};

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect(mapStateToProps, {
    getAbout, setIsChangedAbout,
    createAbout, updateAbout, setDefaultAbout
})(AboutUsContainer);

/*
about = {this.props.about}
                         adminMode={this.props.adminMode}
                         setIsChangedAbout = {this.props.setIsChangedAbout}
                         updateAbout = {this.props.updateAbout}
                         createAbout = {this.props.createAbout}
 */