import {flickrAPI} from '../../api/api'
import {
    SET_PHOTO_ALBUMS,
    SET_PHOTOS,
    SET_PHOTO,
    SET_URL_TO_ALBUMS,
    SET_URL_TO_PHOTOS,
    IS_CLICKED, SET_URL
} from "./types";

/*Создаем объект action с обязательным свойством type*/
export const setPhotosets = (photosets) => {
    return {
        type: SET_PHOTO_ALBUMS,
        payload: photosets
    }
}

export const setPhotos = (photos) => {
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

export const setUrlToAlbums = (photo, set) => {
    return {
        type: SET_URL_TO_ALBUMS,
        payload: photo,
        set: set
    }
}

export const setUrlToPhotos = (photo, card) => {
    return {
        type: SET_URL_TO_PHOTOS,
        payload: photo,
        card: card
    }
}

export const setClicked = (click)=>{
    return{
        type: IS_CLICKED,
        payload: click
    }
}

export const setUrl = (url)=>{
    return{
        type: SET_URL,
        payload: url
    }
}

/*Thunk Creators*/
export const getPhotosets = () => {
    return async (dispatch) => {
        const photosets = await flickrAPI.getAlbums();
        //debugger
        dispatch(setPhotosets(photosets));
    }
}

export const getPhotos = (id) => {
    return async (dispatch) => {
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

export const getAlbumsWithUrl = (id, set) => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id);
        dispatch(setUrlToAlbums(photo, set));
    }
}
export const getPhotoWithUrl = (id, card) => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id);
        dispatch(setUrlToPhotos(photo, card));
    }
}
export const changeClicked = (click) =>{
    return (dispatch) =>{
        dispatch(setClicked(click))
    }
}

export const getUrl = (url) =>{
    return(dispatch) =>{
        dispatch(setUrl(url))
    }
}