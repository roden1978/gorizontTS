import React from 'react';
import {getPhotosets, getAlbumsWithUrl} from '../../redux/actions/photosActions';
import {connect} from "react-redux";
import Gallery from "./Gallery";
import Spinner from "../../common/Spinner";

class GalleryContainer extends React.Component {

    updatePrimary() {
        this.props.sets.length > 0 ? this.props.sets.every((set) => this.props.getAlbumsWithUrl(set.primary, set))
            : this.props.getPhotosets();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //debugger
        if (prevProps.sets.length === 0) {
            this.updatePrimary();
        }

    }

    componentDidMount() {
        this.updatePrimary();
    }

    componentWillUnmount() {
        this.props.setsWithUrl.length = 0;
    }

    render() {
        //debugger
        return (
            <>
                {this.props.setsWithUrl.length === 0 ? <Spinner/> : null}
                <Gallery {...this.props}/>
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
    return {
        sets: state.photos.sets,
        setsWithUrl: state.photos.setsWithUrl
    }
};

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect(mapStateToProps, {getPhotosets, getAlbumsWithUrl})(GalleryContainer);

/*
setsWithUrl = {this.props.setsWithUrl}
 */