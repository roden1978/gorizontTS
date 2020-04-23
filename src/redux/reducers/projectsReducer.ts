import {ProjectsType} from "../../tstypes/projectsTypes"
import {PhotoType} from "../../tstypes/photosTypes"
import {ProjectsActionsTypes} from "../actions/projectsActions"

let initialState = {
    projects: [] as Array<ProjectsType>,
    photos: [] as Array<PhotoType>,
    photosWithUrl: [] as Array<PhotoType>,
    albumsCount: 0,
    id: '',
    loadAlbums: false,
    getProjectsItem: false,
    isAllProjects: false,
    projectsCount: 0,
    albumIdForRedirect: '',
    currentProjectId: '',
    currentPage: 1,
    pageSize: 10,
    isShowSpinner: true
}
export type InitialStateType = typeof initialState

const projects_reducer = (state = initialState, action: ProjectsActionsTypes): InitialStateType => {
    switch (action.type) {
        case "GT/PRJ/SET_PROJECTS": {
            return {
                ...state, projects: action.payload
            }
        }
        case "GT/PRJ/SET_PROJECT": {
            return {
                ...state, projects: [action.payload]
            }
        }
        case "GT/PRJ/SET_ID": {
            return {
                ...state, id: action.payload
            }
        }
        case "GT/PRJ/LOAD_ALBUMS": {
            return {
                ...state, loadAlbums: action.payload
            }
        }
        case "GT/PRJ/IS_ALL_PROJECTS": {
            return {
                ...state, isAllProjects: action.payload
            }
        }
        case "GT/PRJ/SET_PROJECTS_ITEM": {
            return {
                ...state, getProjectsItem: action.payload
            }
        }
        case "GT/PRJ/CHANGE_PROJECTS_ITEM": {
            const projectsItem = state.projects.find((item: ProjectsType) => item._id === state.id)
            return {
                ...state, projects: [projectsItem as ProjectsType]
            }
        }
        case "GT/PRJ/SET_PROJECTS_COUNT": {
            return {
                ...state, projectsCount: action.payload
            }
        }
        case "GT/PRJ/SET_DEFAULT_PROJECT": {
            return {
                ...state, projects: [{
                    _id: '0',
                    title: 'Создайте первый проект',
                    description: '!!!ВНИМАНИЕ!!! Если созданный проект не отобразился обновите проект.',
                    text: '',
                    albumId: '',
                    albumName: '',
                    status: true,
                    createAt: ''
                }]
            }
        }
        case "GT/PRJ/SET_PROJECTS_PHOTOS": {
            const photosWithAlbumId = action.photos.photoset.photo.map((photo: PhotoType) => {
                return {...photo, albumId: action.id}
            })

            return {
                ...state, photos: [...state.photos, ...photosWithAlbumId], albumsCount: state.albumsCount + 1
            }
        }
        case "GT/PRJ/SET_URL_TO_PROJECTS_PHOTOS": {
            const size = action.payload.sizes.size.find(ph => ph.label === "Small")
            return {
                ...state,
                photosWithUrl: [...state.photosWithUrl, {...action.card, url: size!.source}]
            }

        }
        case "GT/PRJ/SET_ALBUM_ID_FOR_REDIRECT": {
            return {
                ...state, albumIdForRedirect: action.payload
            }
        }
        case "GT/PRJ/SET_CURRENT_PROJECT_ID" : {
            return {
                ...state, currentProjectId: action.payload
            }
        }
        case "GT/PRJ/SET_CURRENT_PAGE": {
            return {
                ...state, currentPage: action.payload
            }
        }
        case "GT/PRJ/SET_PROJECTS_IS_SHOW_SPINNER": {
            return {
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default projects_reducer
