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
import {ProjectsType} from "../../tstypes/projectsTypes";
import {PhotoType} from "../../tstypes/photosTypes";
import {ProjectsActionsTypes} from "../actions/projectsActions";

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
    albumIdForRedirect: ''
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
        default:
            return state;
    }
}

export default projects_reducer;
