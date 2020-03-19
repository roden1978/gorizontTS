import {flickrAPI} from '../../api/api'
import {
    SET_PHOTO_ALBUMS,
    SET_PHOTOS,
    SET_URL_TO_ALBUMS,
    SET_URL_TO_PHOTOS,
    IS_CLICKED, SET_URL
} from "./types";
import {PhotosetType, PhotoSizesType, PhotoType} from "../../tstypes/photosTypes";


export type SetPhotosetsActionType = {
    type: typeof SET_PHOTO_ALBUMS
    payload: Array<PhotosetType>
}
/*Создаем объект action с обязательным свойством type*/
export const setPhotosets = (photosets: Array<PhotosetType>): SetPhotosetsActionType => {
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
    set: PhotosetType
}
export const setUrlToAlbums = (photo: PhotoSizesType, set: PhotosetType): SetUrlToAlbumsActionType => {
    return {
        type: SET_URL_TO_ALBUMS,
        payload: photo,
        set: set
    }
}

export type SetUrlToPhotosActionType = {
    type: typeof SET_URL_TO_PHOTOS
    payload: PhotoType
    card: PhotoSizesType
}
export const setUrlToPhotos = (photo: PhotoType, card: PhotoSizesType): SetUrlToPhotosActionType => {
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

/*Thunk Creators*/
export const getPhotosets = () => {
    return async (dispatch: any) => {
        const photosets = await flickrAPI.getAlbums();
        //debugger
        dispatch(setPhotosets(photosets));
    }
}

export const getPhotos = (id: string) => {
    return async (dispatch: any) => {
        const photos = await flickrAPI.getPhotos(id);
        dispatch(setPhotos(photos));
    }
}

/*export const getPhoto = (id) => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id);
        dispatch(setPhoto(photo));
    }
}*/

export const getAlbumsWithUrl = (id: string, set: PhotosetType) => {
    return async (dispatch: any) => {
        const photo = await flickrAPI.getPhoto(id);
        dispatch(setUrlToAlbums(photo, set));
    }
}
export const getPhotoWithUrl = (id: string, card:PhotoSizesType) => {
    return async (dispatch: any) => {
        const photo = await flickrAPI.getPhoto(id);
        dispatch(setUrlToPhotos(photo, card));
    }
}
export const changeClicked = (click: boolean) =>{
    return (dispatch: any) =>{
        dispatch(setClicked(click))
    }
}

export const getUrl = (url: string) =>{
    return(dispatch: any) =>{
        dispatch(setUrl(url))
    }
}