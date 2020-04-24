import { PhotoType, PhotoSizesType, SizeType, PhotoAlbumType} from "../../tstypes/photosTypes"
import {PhotosActionsType} from "../actions/photosActions";

let initialState = {
    sets: [] as Array<PhotoAlbumType>,
    setsWithUrl: [] as Array<PhotoAlbumType>,
    photos: [] as Array<PhotoType>,
    photosWithUrl: [] as Array<PhotoType>,
    photo: [] as Array<PhotoSizesType>,
    isClicked: false,
    url: '',
    albumName: '',
    isShowSpinner: true
}

export type InitialStateType = typeof initialState

const photos_reducer = (state = initialState, action: PhotosActionsType): InitialStateType => {

    switch (action.type) {
        case "GT/PHOTOS/SET_PHOTO_ALBUMS": {
            return {
                ...state, sets: action.payload
            }
        }
        case "GT/PHOTOS/SET_PHOTOS": {
            return {
                ...state, photos: action.payload
            }
        }
        case "GT/PHOTOS/SET_URL_TO_ALBUMS":{
            const size: SizeType | undefined = action.payload.sizes.size.find((ph: SizeType) => ph.label === "Medium")
            if(size){
                return {
                    ...state,
                    setsWithUrl: [...state.setsWithUrl, {...action.set, primary: size.source}]
                }
            }
            else return {...state}
        }
        case "GT/PHOTOS/SET_URL_TO_PHOTOS":{
            const size: SizeType | undefined= action.payload.sizes.size.find((ph: SizeType) => ph.label === "Large")
            if (size){
                return {
                    ...state,
                    photosWithUrl: [...state.photosWithUrl, {...action.card, url: size!.source}]
                }
            }
            else return {...state}

        }
        case "GT/PHOTOS/IS_CLICKED":{
            return {...state, isClicked: action.payload}
        }
        case "GT/PHOTOS/SET_URL":{
            return {...state, url: action.payload}
        }
        case "GT/PHOTOS/SET_ALBUM_NAME": {
            return {
                ...state, albumName: action.payload
            }
        }
        case "GT/PHOTOS/SET_ALBUMS_IS_SHOW_SPINNER": {
            return {
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default photos_reducer