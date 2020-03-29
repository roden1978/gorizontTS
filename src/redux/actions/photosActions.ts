import {flickrAPI} from '../../api/api'
import {
    SET_PHOTO_ALBUMS,
    SET_PHOTOS,
    SET_URL_TO_ALBUMS,
    SET_URL_TO_PHOTOS,
    IS_CLICKED, SET_URL
} from "./types"
import {PhotoAlbumType, PhotoSizesType, PhotoType} from "../../tstypes/photosTypes"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store"

type PhotosActionsType = SetPhotosetsActionType | SetPhotosActionType | SetUrlToAlbumsActionType |
    SetUrlToPhotosActionType | SetClickedActionType | SetUrlActionType

export type SetPhotosetsActionType = {
    type: typeof SET_PHOTO_ALBUMS
    payload: Array<PhotoAlbumType>
}
/*Создаем объект action с обязательным свойством type*/
export const setPhotosets = (photosets: Array<PhotoAlbumType>): SetPhotosetsActionType => {
    return {
        type: SET_PHOTO_ALBUMS,
        payload: photosets
    }
}

export type SetPhotosActionType = {
    type: typeof SET_PHOTOS
    payload: Array<PhotoType>
}
export const setPhotos = (photos: Array<PhotoType>): SetPhotosActionType => {
    return {
        type: SET_PHOTOS,
        payload: photos
    }
}

/*export const setPhoto = (photo) => {
    return {
        type: SET_PHOTO,
        payload: photo
    }
}*/

export type SetUrlToAlbumsActionType = {
    type: typeof SET_URL_TO_ALBUMS
    payload: PhotoSizesType
    set: PhotoAlbumType
}
export const setUrlToAlbums = (photo: PhotoSizesType, set: PhotoAlbumType): SetUrlToAlbumsActionType => {
    return {
        type: SET_URL_TO_ALBUMS,
        payload: photo,
        set: set
    }
}

export type SetUrlToPhotosActionType = {
    type: typeof SET_URL_TO_PHOTOS
    payload: PhotoSizesType
    card: PhotoType
}
export const setUrlToPhotos = (photo: PhotoSizesType, card: PhotoType): SetUrlToPhotosActionType => {
    return {
        type: SET_URL_TO_PHOTOS,
        payload: photo,
        card: card
    }
}

export type SetClickedActionType = {
    type: typeof IS_CLICKED,
    payload: boolean
}
export const setClicked = (click: boolean): SetClickedActionType => {
    return{
        type: IS_CLICKED,
        payload: click
    }
}

export type SetUrlActionType = {
    type: typeof SET_URL
    payload: string
}
export const setUrl = (url: string): SetUrlActionType =>{
    return{
        type: SET_URL,
        payload: url
    }
}

type PhotosThunkType = ThunkAction<Promise<void> | void, AppStateType, unknown, PhotosActionsType>

/*Thunk Creators*/
export const getPhotosets = (): PhotosThunkType => {
    return async (dispatch) => {
        const albums = await flickrAPI.getAlbums()
        if(albums)
        dispatch(setPhotosets(albums.photosets.photoset))
    }
}

export const getPhotos = (id: string): PhotosThunkType => {
    return async (dispatch) => {
        const photos = await flickrAPI.getPhotos(id)
        if(photos)
        dispatch(setPhotos(photos.photoset.photo))
    }
}

/*export const getPhoto = (id) => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id)
        dispatch(setPhoto(photo))
    }
}*/

export const getAlbumsWithUrl = (id: string, set: PhotoAlbumType): PhotosThunkType => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id)
        if(photo)
        dispatch(setUrlToAlbums(photo, set))
    }
}
export const getPhotoWithUrl = (id: string, card:PhotoType): PhotosThunkType => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id)
        if(photo)
        dispatch(setUrlToPhotos(photo, card))
    }
}
export const changeClicked = (click: boolean): PhotosThunkType =>{
    return (dispatch) =>{
        dispatch(setClicked(click))
    }
}

export const getUrl = (url: string): PhotosThunkType =>{
    return(dispatch) =>{
        dispatch(setUrl(url))
    }
}