import React from 'react'
import {getPhotos, getPhotoWithUrl, changeClicked, getUrl, photosActions} from '../../redux/actions/photosActions'
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
    currentPhotoIndex: number
}

type MapDispatchToPropsType = {
    getPhotos: (id: string) => void
    getPhotoWithUrl: (id: string, card: PhotoType) => void /////////////
    changeClicked: (click: boolean) => void
    getUrl: (url: string) => void
    setCurrentPhotoIndex: (currentPhotoIndex: number) => void
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
        return (
            <>
                {!this.props.cards && this.props.cards!.length === 0 ? <Spinner/> : <PhotoAlbum {...this.props}/>}

            </>)
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        photos: state.photos.photos,
        cards: state.photos.photosWithUrl,
        isClicked: state.photos.isClicked,
        url: state.photos.url,
        albumName: state.photos.albumName,
        currentPhotoIndex: state.photos.currentPhotoIndex
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps,
    {getPhotos, getPhotoWithUrl, changeClicked, getUrl,
        setCurrentPhotoIndex: photosActions.setCurrentPhotoIndex})(PhotoAlbumContainer)
