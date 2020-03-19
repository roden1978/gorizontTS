import {
    SET_PHOTO_ALBUMS,
    SET_PHOTOS,
    SET_URL_TO_ALBUMS,
    SET_URL_TO_PHOTOS,
    IS_CLICKED,
    SET_URL
} from "../actions/types";
import {PhotosetType, PhotoType, PhotoSizesType} from "../../tstypes/photosTypes";

let initialState = {
    sets: [] as Array<PhotosetType>,
    setsWithUrl: [] as Array<PhotosetType>,
    photos: [] as Array<PhotoType>,
    photosWithUrl: [] as Array<PhotoType>,
    photo: [] as Array<PhotoSizesType>,
    isClicked: false,
    url: '' as string
}

export type InitialStateType = typeof initialState

const photos_reducer = (state = initialState, action: any): InitialStateType => {
//debugger
    switch (action.type) {
        case SET_PHOTO_ALBUMS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, sets: action.payload
            };
        }
        case SET_PHOTOS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, photos: action.payload.photoset.photo
            };
        }
        case SET_URL_TO_ALBUMS:{
            const size = action.payload.sizes.size.find((ph: PhotoSizesType) => ph.label === "Medium")
            return {
                ...state,
                setsWithUrl: [...state.setsWithUrl, {...action.set, primary: size.source}]
                }

        }
        case SET_URL_TO_PHOTOS:{
            const size = action.payload.sizes.size.find((ph: PhotoSizesType) => ph.label === "Large")
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
        default:
            return state;
    }
}

export default photos_reducer;

/* case SET_PHOTO: {
            return {
                ...state, photo: action.payload.sizes.size
            };
        }*/