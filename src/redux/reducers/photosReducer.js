import {
    SET_PHOTO_ALBUMS,
    SET_PHOTOS,
    SET_PHOTO,
    SET_URL_TO_ALBUMS,
    SET_URL_TO_PHOTOS,
    IS_CLICKED,
    SET_URL
} from "../actions/types";

/*export type = {
    "id": "72157713515955001",
    "owner": "185587932@N03",
    "username": "rdn.homebox",
    "primary": "49669267867",
    "secret": "d83851bb5e",
    "server": "65535",
    "farm": 66,
    "count_views": "0",
    "count_comments": "0",
    "count_photos": 9,
    "count_videos": 0,
    "title": {
        "_content": "Парк техники"
    },
    "description": {
        "_content": "Парк строительной техники"
    },
    "can_comment": 0,
    "date_create": "1584442074",
    "date_update": "1584442273",
    "photos": 9,
    "videos": 0,
    "visibility_can_see_set": 1,
    "needs_interstitial": 0
}*/

let initialState = {
    sets: [],
    setsWithUrl: [],
    photos: [],
    photosWithUrl: [],
    photo: [],
    isClicked: false,
    url: ''
}

const photos_reducer = (state = initialState, action) => {
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
        case SET_PHOTO: {
            return {
                ...state, photo: action.payload.sizes.size
            };
        }
        case SET_URL_TO_ALBUMS:{
            //debugger
            const size = action.payload.sizes.size.find(ph => ph.label === "Medium")
            return {
                ...state,
                setsWithUrl: [...state.setsWithUrl, {...action.set, primary: size.source}]
                }

        }
        case SET_URL_TO_PHOTOS:{
        //debugger
            const size = action.payload.sizes.size.find(ph => ph.label === "Large")
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

    //let copyState;// = {...state};
    //debugger
}

export default photos_reducer;

/* [{__id:'123', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'},
        {__id:'1234', title: 'title', text: 'text', project: 'project', createAt:'26.11.2019'}]*/