import {
    CHANGE_PROJECTS_ITEM,
    IS_ALL_PROJECTS,
    LOAD_ALBUMS,
    SET_ALBUM_ID_FOR_REDIRECT,
    SET_CURRENT_PROJECT_ID,
    SET_DEFAULT_PROJECT,
    SET_ID,
    SET_PROJECT,
    SET_PROJECTS,
    SET_PROJECTS_COUNT,
    SET_PROJECTS_CURRENT_PAGE,
    SET_PROJECTS_ITEM,
    SET_PROJECTS_PHOTOS,
    SET_URL_TO_PROJECTS_PHOTOS
} from "../actions/types"
import {ProjectsType} from "../../tstypes/projectsTypes"
import {PhotoType} from "../../tstypes/photosTypes"
import {ProjectsActionsTypes} from "../actions/projectsActions"

let initialState = {
    projects: [] as Array<ProjectsType>,
    photos:[] as Array<PhotoType>,
    photosWithUrl: [] as Array<PhotoType>,
    albumsCount: 0,
    id: '',
    loadAlbums: false,
    getProjectsItem: false,
    isAllProjects: false,
    projectsCount: 0,
    albumIdForRedirect: '',
    currentProjectId:'',
    currentPage: 1,
    pageSize: 10
}
export type InitialStateType = typeof initialState

const projects_reducer = (state = initialState, action: ProjectsActionsTypes): InitialStateType => {
//debugger
    switch (action.type) {
        case SET_PROJECTS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, projects: action.payload
            }
            // break
        }
        case SET_PROJECT: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
            return {
                ...state, projects: [action.payload]
            }
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
            const projectsItem  = state.projects.find((item: ProjectsType) =>item._id === state.id)
            return {
                ...state, projects: [projectsItem as ProjectsType]
            }
        }
        case SET_PROJECTS_COUNT :{
            return{
                ...state, projectsCount: action.payload
            }
        }
        case SET_DEFAULT_PROJECT :{
            return{
                ...state, projects: [{_id: '0', title: 'Создайте первый проект',
                    description:'!!!ВНИМАНИЕ!!! Если созданный проект не отобразился обновите проект.',text: '',albumId:'',
                    albumName: '', status: true, createAt:''}]
            }
        }
        case SET_PROJECTS_PHOTOS:{
            const photosWithAlbumId = action.photos.photoset.photo.map((photo: PhotoType) => {
                return {...photo, albumId: action.id}
            })

            return {
                ...state, photos: [...state.photos, ...photosWithAlbumId], albumsCount: state.albumsCount + 1
            }
        }
        case SET_URL_TO_PROJECTS_PHOTOS:{
            const size = action.payload.sizes.size.find(ph => ph.label === "Small")
            return {
                ...state,
                photosWithUrl: [...state.photosWithUrl, {...action.card, url: size!.source}]
            }

        }
        case SET_ALBUM_ID_FOR_REDIRECT :{
            return{
                ...state, albumIdForRedirect: action.payload
            }
        }
        case SET_CURRENT_PROJECT_ID :{
            return{
                ...state, currentProjectId: action.payload
            }
        }
        case SET_PROJECTS_CURRENT_PAGE :{
            return{
                ...state, currentPage: action.payload
            }
        }
        default:
            return state
    }
}

export default projects_reducer
