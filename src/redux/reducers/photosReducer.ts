import {
    SET_PHOTO_ALBUMS,
    SET_PHOTOS,
    SET_URL_TO_ALBUMS,
    SET_URL_TO_PHOTOS,
    IS_CLICKED,
    SET_URL, SET_ALBUM_NAME,
    SET_ALBUMS_IS_SHOW_SPINNER
} from "../actions/types"
import { PhotoType, PhotoSizesType, SizeType, PhotoAlbumType} from "../../tstypes/photosTypes"

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

const photos_reducer = (state = initialState, action: any): InitialStateType => {
//debugger
    switch (action.type) {
        case SET_PHOTO_ALBUMS: {
            return {
                ...state, sets: action.payload
            }
        }
        case SET_PHOTOS: {
            return {
                ...state, photos: action.payload
            }
        }
        case SET_URL_TO_ALBUMS:{
            const size: SizeType = action.payload.sizes.size.find((ph: SizeType) => ph.label === "Medium")
            return {
                ...state,
                setsWithUrl: [...state.setsWithUrl, {...action.set, primary: size.source}]
                }

        }
        case SET_URL_TO_PHOTOS:{
            const size: SizeType = action.payload.sizes.size.find((ph: SizeType) => ph.label === "Large")
            return {
                ...state,
                photosWithUrl: [...state.photosWithUrl, {...action.card, url: size.source}]
            }

        }
        case IS_CLICKED:{
            return {...state, isClicked: action.payload}
        }
        case SET_URL:{
            return {...state, url: action.payload}
        }
        case SET_ALBUM_NAME: {
            return {
                ...state, albumName: action.payload
            }
        }
        case SET_ALBUMS_IS_SHOW_SPINNER: {
            return {
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default photos_reducer