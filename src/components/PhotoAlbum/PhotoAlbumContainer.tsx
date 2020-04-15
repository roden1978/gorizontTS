import React from 'react'
import {getPhotos, getPhotoWithUrl, changeClicked, getUrl} from '../../redux/actions/photosActions'
import {connect} from "react-redux"
import PhotoAlbum from "./PhotoAlbum"
import Spinner from "../../common/Spinner"
import {AppStateType} from "../../redux/store"
import {PhotoType} from "../../tstypes/photosTypes"

type MapStateToPropsType = {
    photos: Array<PhotoType>
    cards: Array<PhotoType>
    isClicked: boolean
    url: string
    albumName: string
}

type MapDispatchToPropsType = {
    getPhotos: (id: string) => void
    getPhotoWithUrl: (id: string, card: PhotoType) => void /////////////
    changeClicked: (click: boolean) => void
    getUrl: (url: string) => void
}

type OwnProps = {
    albumId: string
}
export type PropsType = MapStateToPropsType & MapDispatchToPropsType
type PrevStateType = MapStateToPropsType

class PhotoAlbumContainer extends React.Component<PropsType & OwnProps> {

    updatePrimary() {
        this.props.photos.length > 0 ? this.props.photos.every((card: PhotoType) => this.props.getPhotoWithUrl(card.id, card))
            : this.props.getPhotos(this.props.albumId)
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateType) {
        //debugger
        if (prevProps.photos.length === 0) {
            this.updatePrimary()
        }

    }


    componentDidMount() {
        this.updatePrimary()
    }

    componentWillUnmount() {
        this.props.cards.length = 0
        this.props.photos.length = 0
    }

    render() {
        //debugger
        return (
            <>
                {!this.props.cards && this.props.cards!.length === 0 ? <Spinner/> : <PhotoAlbum {...this.props}/>}

            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        photos: state.photos.photos,
        cards: state.photos.photosWithUrl,
        isClicked: state.photos.isClicked,
        url: state.photos.url,
        albumName: state.photos.albumName
    }
}

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps,
    {getPhotos, getPhotoWithUrl, changeClicked, getUrl})(PhotoAlbumContainer)

/*
 cards={this.props.photosWithUrl}
                            isClicked={this.props.isClicked}
                            url={this.props.url}
                            changeClicked={this.props.changeClicked}
                            getUrl={this.props.getUrl}
 */