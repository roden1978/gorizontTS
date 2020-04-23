import {flickrAPI, mongodbAPI} from '../../api/api'
import {ProjectsType} from "../../tstypes/projectsTypes"
import {PhotosetType, PhotoSizesType, PhotoType} from "../../tstypes/photosTypes"
import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "../store"


export type ProjectsActionsTypes = ActionsTypes<typeof projectsActions>
export const projectsActions = {
    setProjects: (projects: Array<ProjectsType>) => (
        {
            type: 'GT/PRJ/SET_PROJECTS',
            payload: projects
        } as const
    ),
    setProject: (project: ProjectsType) => (
        {
            type: 'GT/PRJ/SET_PROJECT',
            payload: project
        } as const
    ),
    setId: (id: string) => (
        {
            type: 'GT/PRJ/SET_ID',
            payload: id
        } as const
    ),
    setLoadAlbums: (loadAlbums: boolean) => (
        {
            type: 'GT/PRJ/LOAD_ALBUMS',
            payload: loadAlbums
        }  as const
    ),
    setIsAllProjects: (isAllProjects: boolean) => (
        {
            type: 'GT/PRJ/IS_ALL_PROJECTS',
            payload: isAllProjects
        }  as const
    ),
    setChangeProjectsItem: () => (
        {
            type: 'GT/PRJ/CHANGE_PROJECTS_ITEM'
        } as const
    ),
    setProjectsItem: (projectsItem: boolean) => (
        {
            type: 'GT/PRJ/SET_PROJECTS_ITEM',
            payload: projectsItem
        }  as const
    ),
    setProjectsCount: (count: number) => (
        {
            type: 'GT/PRJ/SET_PROJECTS_COUNT',
            payload: count
        } as const
    ),
    setDefaultProject: () => (
        {
            type: 'GT/PRJ/SET_DEFAULT_PROJECT'
        }  as const
    ),
    setProjectsPhotos: (id: string, photos: PhotosetType) => (
        {
            type: 'GT/PRJ/SET_PROJECTS_PHOTOS',
            id: id,
            photos: photos
        } as const
    ),
    setUrlToPhotos: (photo: PhotoSizesType, card: PhotoType) => (
        {
            type: 'GT/PRJ/SET_URL_TO_PROJECTS_PHOTOS',
            payload: photo,
            card: card
        }  as const
    ),
    setAlbumIdForRedirect: (id: string) => (
        {
            type: 'GT/PRJ/SET_ALBUM_ID_FOR_REDIRECT',
            payload: id
        } as const
    ),
    setCurrentProjectId: (id: string) => (
        {
            type: 'GT/PRJ/SET_CURRENT_PROJECT_ID',
            payload: id
        } as const
    ),
    setProjectsCurrentPage: (currentPage: number) => (
        {
            type: 'GT/PRJ/SET_CURRENT_PAGE',
            payload: currentPage
        } as const
    ),
    setIsShowSpinner: (isShowSpinner: boolean) => (
        {
            type: "GT/PRJ/SET_PROJECTS_IS_SHOW_SPINNER",
            payload: isShowSpinner
        } as const
    )
}


/*Thunk Creators*/
export type ProjectsThunkType = ThunkAction<Promise<void> | void, AppStateType, unknown, ProjectsActionsTypes>
export const getProjects = (): ProjectsThunkType => {
    return async (dispatch) => {
        const projects = await mongodbAPI.getProjects()
        if(projects)
        dispatch(projectsActions.setProjects(projects))
    }
}

export const getProject = (id: string): ProjectsThunkType => {
    return async (dispatch) => {
        const project = await mongodbAPI.getProject(id)
        if(project)
        dispatch(projectsActions.setProject(project))
    }
}

export const getId = (id: string): ProjectsThunkType => {
    return (dispatch) => {
        dispatch(projectsActions.setId(id))
    }
}

export const getAllProjects = (currentPage: number, pageSize: number): ProjectsThunkType => {
    return async (dispatch) => {
        const projects = await mongodbAPI.getAllProjects(currentPage, pageSize)
        if(projects)
        dispatch(projectsActions.setProjects(projects))
    }
}

export const createProject = (title: string, description: string, text: string,
                              albumId: string, albumName: string, status: boolean, createAt: string): ProjectsThunkType =>{
    return async (dispatch) =>{
        const data = await mongodbAPI.createProject({title, description, text, albumId, albumName, status, createAt})
        if (data.resultCode === 0) {
            dispatch(projectsActions.setIsAllProjects(true))
        }
    }
}

export const updateProject = (_id: string, title: string, description: string, text: string,
                              albumId: string, albumName:string, status: boolean, createAt: string): ProjectsThunkType =>{
    return async (dispatch) =>{
        const data = await mongodbAPI.updateProject({_id, title, description, text, albumId, albumName, status, createAt})
        if (data.resultCode === 0) {
            dispatch(projectsActions.setIsAllProjects(true))
        }
    }
}

export const deleteProject = (id: string):ProjectsThunkType =>{
    return async (dispatch) =>{
        const data = await mongodbAPI.deleteProject(id)
        if (data.resultCode === 0) {
            dispatch(projectsActions.setIsAllProjects(true))
        }
    }
}

export const getPhotos = (id: string): ProjectsThunkType => {
    return async (dispatch) => {
        const photos = await flickrAPI.getPhotos(id)
        if(photos)
        dispatch(projectsActions.setProjectsPhotos(id, photos))
    }
}

export const getPhotoWithUrl = (id: string, card: PhotoType): ProjectsThunkType => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id)
        if(photo)
        dispatch(projectsActions.setUrlToPhotos(photo, card))
    }
}

export const checkAlbum = (id: string): ProjectsThunkType =>{
    return async (dispatch) =>{
        const data = await flickrAPI.getPhotos(id)
        if (data) {
            dispatch(projectsActions.setAlbumIdForRedirect(data.photoset.id))
        }
    }
}

export const getProjectsCount = (): ProjectsThunkType =>{
    return async (dispatch) =>{
        const count = await mongodbAPI.getProjectsCount()
        if(count)
            dispatch(projectsActions.setProjectsCount(count))
    }
}
