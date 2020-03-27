import React from 'react'
import {getPhotosets, getAlbumsWithUrl} from '../../redux/actions/photosActions'
import {connect} from "react-redux"
import Gallery from "./Gallery"
import Spinner from "../../common/Spinner"
import {AppStateType} from "../../redux/store"
import {PhotoAlbumType} from "../../tstypes/photosTypes"

type MapStateToPropsType = {
    sets: Array<PhotoAlbumType>
    setsWithUrl: Array<PhotoAlbumType>
}

type MapDispatchToPropsType = {
    getPhotosets: () => void
    getAlbumsWithUrl: (id: string, set: PhotoAlbumType) => void
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType
type PrevStateType = MapStateToPropsType

class GalleryContainer extends React.Component<PropsType> {

    updatePrimary() {
        this.props.sets.length > 0 ? this.props.sets.every((set: PhotoAlbumType) => this.props.getAlbumsWithUrl(set.primary, set))
            : this.props.getPhotosets()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateType) {

        if (prevProps.sets.length === 0) {
            this.updatePrimary()
        }

    }

    componentDidMount() {
        this.updatePrimary()
    }

    componentWillUnmount() {
        this.props.setsWithUrl.length = 0
    }

    render() {

        return (
            <>
                {this.props.setsWithUrl.length === 0 ? <Spinner/> : null}
                <Gallery {...this.props}/>
            </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        sets: state.photos.sets,
        setsWithUrl: state.photos.setsWithUrl
    }
}

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
    {getPhotosets, getAlbumsWithUrl})(GalleryContainer)
