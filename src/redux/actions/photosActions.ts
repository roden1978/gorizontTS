import {flickrAPI} from '../../api/api'
import {PhotoAlbumType, PhotoSizesType, PhotoType} from "../../tstypes/photosTypes"
import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "../store"

export type PhotosActionsType = ActionsTypes<typeof photosActions>
export const photosActions = {
    setPhotosets: (photosets: Array<PhotoAlbumType>) => (
        {
            type: 'GT/PHOTOS/SET_PHOTO_ALBUMS',
            payload: photosets
        } as const
    ),
    setPhotos: (photos: Array<PhotoType>) => (
        {
            type: 'GT/PHOTOS/SET_PHOTOS',
            payload: photos
        } as const
    ),
    setUrlToAlbums: (photo: PhotoSizesType, set: PhotoAlbumType) => (
        {
            type: 'GT/PHOTOS/SET_URL_TO_ALBUMS',
            payload: photo,
            set: set
        } as const
    ),
    setUrlToPhotos: (photo: PhotoSizesType, card: PhotoType) => (
        {
            type: 'GT/PHOTOS/SET_URL_TO_PHOTOS',
            payload: photo,
            card: card
        } as const
    ),
    setClicked: (click: boolean) => (
        {
            type: 'GT/PHOTOS/IS_CLICKED',
            payload: click
        } as const
    ),
    setUrl: (url: string) => (
        {
            type: 'GT/PHOTOS/SET_URL',
            payload: url
        } as const
    ),
    setAlbumName: (name: string) => (
        {
            type: 'GT/PHOTOS/SET_ALBUM_NAME',
            payload: name
        } as const
    ),
    setIsShowSpinner: (isShowSpinner: boolean) => (
        {
            type: 'GT/PHOTOS/SET_ALBUMS_IS_SHOW_SPINNER',
            payload: isShowSpinner
        } as const
    ),
    setCurrentPhotoIndex: (currentPhotoIndex: number) =>(
        {
            type: 'GT/PHOTOS/SET_CURRENT_PHOTO_INDEX',
            payload: currentPhotoIndex
        } as const
    )
}


type PhotosThunkType = ThunkAction<Promise<void> | void, AppStateType, unknown, PhotosActionsType>

/*Thunk Creators*/
export const getPhotosets = (): PhotosThunkType => {
    return async (dispatch) => {
        const albums = await flickrAPI.getAlbums()
        if (albums)
            dispatch(photosActions.setPhotosets(albums.photosets.photoset))
    }
}

export const getPhotos = (id: string): PhotosThunkType => {
    return async (dispatch) => {
        const photos = await flickrAPI.getPhotos(id)
        if (photos) {
            dispatch(photosActions.setPhotos(photos.photoset.photo))
            dispatch(photosActions.setAlbumName(photos.photoset.title))
        }
    }
}

export const getAlbumsWithUrl = (id: string, set: PhotoAlbumType): PhotosThunkType => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id)
        if (photo)
            dispatch(photosActions.setUrlToAlbums(photo, set))
    }
}
export const getPhotoWithUrl = (id: string, card: PhotoType): PhotosThunkType => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id)
        if (photo)
            dispatch(photosActions.setUrlToPhotos(photo, card))
    }
}
export const changeClicked = (click: boolean): PhotosThunkType => {
    return (dispatch) => {
        dispatch(photosActions.setClicked(click))
    }
}

export const getUrl = (url: string): PhotosThunkType => {
    return (dispatch) => {
        dispatch(photosActions.setUrl(url))
    }
}