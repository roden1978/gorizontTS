import {
    SET_PROJECTS,
    SET_PROJECT,
    SET_ID,
    LOAD_ALBUMS,
    CHANGE_PROJECTS_ITEM,
    SET_PROJECTS_ITEM,
    IS_ALL_PROJECTS,
    SET_PROJECTS_COUNT,
    SET_DEFAULT_PROJECT,
    SET_PROJECTS_PHOTOS,
    SET_URL_TO_PROJECTS_PHOTOS, SET_ALBUM_ID_FOR_REDIRECT
} from "../actions/types";

export type ProjectType = {
    _id?: string
    title: string
    description: string
    text: string
    albumId: string | null
    albumName: string | null
    status: boolean
    createAt?: string
}

export type PhotoType = {
    id: string
    secret: string
    server: string
    farm: number
    title: string
    isprimary: string
    ispublic: number
    isfriend: number
    isfamily: number
    url?: string
    albumId?: string
}
export type PhotoSizesType = {
    label: string
    width: number
    height: number
    source: string
    url: string
    media: string
}

let initialState = {
    projects: [] as Array<ProjectType>,
    photos:[] as Array<PhotoType>,
    photosWithUrl: [] as Array<PhotoType>,
    albumsCount: 0 as number,
    id: null as string | null,
    loadAlbums: false,
    getProjectsItem: false,
    isAllProjects: false,
    projectsCount: null as number | null,
    albumIdForRedirect: null as string | null
}

export type InitialStateType = typeof initialState

const projects_reducer = (state = initialState, action: any): InitialStateType => {
//debugger
    switch (action.type) {
        case SET_PROJECTS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, projects: action.payload
            };
            // break
        }
        case SET_PROJECT: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, projects: [action.payload]
            };
            // break
        }
            case SET_ID: {
                return{
                    ...state, id: action.payload
                }
            }
        case  LOAD_ALBUMS:{
            return {
                ...state, loadAlbums: action.payload
            }
        }
        case  IS_ALL_PROJECTS:{
            return {
                ...state, isAllProjects: action.payload
            }
        }
        case  SET_PROJECTS_ITEM:{
            return {
                ...state, getProjectsItem: action.payload
            }
        }
        case CHANGE_PROJECTS_ITEM:{
            const projectsItem  = state.projects.find((item: ProjectType) =>item._id === state.id)
            return {
                ...state, projects: [projectsItem as ProjectType]
            }
        }
        case SET_PROJECTS_COUNT :{
            return{
                ...state, projectsCount: action.payload
            }
        }
        case SET_DEFAULT_PROJECT :{
            return{
                ...state, projects: [{_id: '0', title: 'Войдите в панель администирования и создайте проект',
                    description:'!!!ВНИМАНИЕ!!! Если созданный проект не отобразился обновите страницу.',text: '',albumId:'',
                    albumName: '', status: true}]
            }
        }
        case SET_PROJECTS_PHOTOS:{
            const photosWithAlbumId = action.photos.photoset.photo.map((photo: PhotoType) => {
                return {...photo, albumId: action.id}
            })

            return {
                ...state, photos: [...state.photos, ...photosWithAlbumId], albumsCount: state.albumsCount + 1
            };
        }
        case SET_URL_TO_PROJECTS_PHOTOS:{
            //debugger
            const size = action.payload.sizes.size.find((ph: PhotoSizesType) => ph.label === "Small")
            return {
                ...state,
                photosWithUrl: [...state.photosWithUrl, {...action.card, url: size.source}]
            }

        }
        case SET_ALBUM_ID_FOR_REDIRECT :{
            return{
                ...state, albumIdForRedirect: action.payload
            }
        }
        default:
            return state;
    }
}

export default projects_reducer;


/*case SET_PROJECT: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
/*return {
    ...state, projects: [...state.projects, action.payload]
};
}
"Small"
"Large"
*/