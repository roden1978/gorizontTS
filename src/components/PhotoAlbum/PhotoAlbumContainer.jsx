import React from 'react';
import {getPhotos, getPhotoWithUrl, changeClicked, getUrl} from '../../redux/actions/photosActions';
import {connect} from "react-redux";
import PhotoAlbum from "./PhotoAlbum";
import Spinner from "../../common/Spinner";

class PhotoAlbumContainer extends React.Component {

    updatePrimary() {
        this.props.photos.length > 0 ? this.props.photos.every((card) => this.props.getPhotoWithUrl(card.id, card))
            : this.props.getPhotos(this.props.match.params.albumId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //debugger
        if (prevProps.photos.length === 0) {
            this.updatePrimary();
        }

    }


    componentDidMount() {
        this.updatePrimary();
    }

    componentWillUnmount() {
        this.props.cards.length = 0;
        this.props.photos.length = 0;
    }

    render() {
        //debugger
        return (
            <>
                {this.props.cards.length === 0 ? <Spinner/> : null}
                <PhotoAlbum {...this.props}/>
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
    return {
        photos: state.photos.photos,
        cards: state.photos.photosWithUrl,
        isClicked: state.photos.isClicked,
        url: state.photos.url
    }
};

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect(mapStateToProps, {getPhotos, getPhotoWithUrl, changeClicked, getUrl})(PhotoAlbumContainer);

/*
 cards={this.props.photosWithUrl}
                            isClicked={this.props.isClicked}
                            url={this.props.url}
                            changeClicked={this.props.changeClicked}
                            getUrl={this.props.getUrl}
 */