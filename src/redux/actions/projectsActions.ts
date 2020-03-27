import {flickrAPI, mongodbAPI} from '../../api/api'
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
    SET_PROJECTS_ITEM,
    SET_PROJECTS_PHOTOS,
    SET_URL_TO_PROJECTS_PHOTOS
} from "./types"
import {ProjectsType} from "../../tstypes/projectsTypes"
import {PhotosetType, PhotoSizesType, PhotoType} from "../../tstypes/photosTypes"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store"


export type ProjectsActionsTypes = SetProjectsActionType | SetProjectActionType | SetIdActionType |
    SetLoadAlbumsActionType | SetIsAllProjectsActionType | SetChangeProjectsItemActionType |
    SetProjectsItemActionType | SetProjectsCountActionType | SetDefaultProjectActionType |
    SetProjectsPhotosActionType | SetUrlToPhotosActionType | SetAlbumIdForRedirectActionType |
    SetCurrentProjectIdActionType

export type SetProjectsActionType = {
    type: typeof SET_PROJECTS
    payload: Array<ProjectsType>
}
/*Создаем объект action с обязательным свойством type*/
export const setProjects = (projects: Array<ProjectsType>): SetProjectsActionType => {
    return {
        type: SET_PROJECTS,
        payload: projects
    }
}

export type SetProjectActionType = {
    type: typeof SET_PROJECT
    payload: ProjectsType
}
export const setProject = (project: ProjectsType): SetProjectActionType => {
    return {
        type: SET_PROJECT,
        payload: project
    }
}

export type SetIdActionType = {
    type: typeof SET_ID
    payload: string
}
export const setId = (id: string): SetIdActionType => {
    return {
        type: SET_ID,
        payload: id
    }
}

export type SetLoadAlbumsActionType = {
    type: typeof LOAD_ALBUMS
    payload: boolean
}
export const setLoadAlbums = (loadAlbums: boolean): SetLoadAlbumsActionType =>{
    return{
        type: LOAD_ALBUMS,
        payload: loadAlbums
    }
}

export type SetIsAllProjectsActionType = {
    type: typeof IS_ALL_PROJECTS
    payload: boolean
}
/**
 * Утановка флага для выполнения загрузки всех проектов без фильтров
 * @param isAllProjects
 * @returns {{payload: *, type: string}}
 */
export const setIsAllProjects = (isAllProjects: boolean):SetIsAllProjectsActionType =>{
    return{
        type: IS_ALL_PROJECTS,
        payload: isAllProjects
    }
}

export type SetChangeProjectsItemActionType = {
    type: typeof CHANGE_PROJECTS_ITEM
}
export const setChangeProjectsItem = (): SetChangeProjectsItemActionType =>{
    return{
        type: CHANGE_PROJECTS_ITEM
    }
}

export type SetProjectsItemActionType = {
    type: typeof SET_PROJECTS_ITEM
    payload: boolean
}
export const setProjectsItem = (projectsItem: boolean): SetProjectsItemActionType =>{
    return {
        type: SET_PROJECTS_ITEM,
        payload: projectsItem
    }
}

export type SetProjectsCountActionType = {
    type: typeof SET_PROJECTS_COUNT
    payload: number
}
export const  setProjectsCount = (count: number): SetProjectsCountActionType =>{
    return {
        type: SET_PROJECTS_COUNT,
        payload: count
    }
}

export type SetDefaultProjectActionType = {
    type: typeof SET_DEFAULT_PROJECT
}
export const setDefaultProject = (): SetDefaultProjectActionType =>{
    return{
        type: SET_DEFAULT_PROJECT
    }
}

export type SetProjectsPhotosActionType = {
    type: typeof SET_PROJECTS_PHOTOS
    id: string
    photos: PhotosetType
}
export const setProjectsPhotos = (id: string, photos: PhotosetType): SetProjectsPhotosActionType =>{
    return{
        type: SET_PROJECTS_PHOTOS,
        id: id,
        photos: photos
    }
}

export type SetUrlToPhotosActionType = {
    type: typeof SET_URL_TO_PROJECTS_PHOTOS
    payload: PhotoSizesType
    card: PhotoType
}
export const setUrlToPhotos = (photo: PhotoSizesType, card: PhotoType): SetUrlToPhotosActionType => {
    return {
        type: SET_URL_TO_PROJECTS_PHOTOS,
        payload: photo,
        card: card
    }
}

export type SetAlbumIdForRedirectActionType = {
    type: typeof SET_ALBUM_ID_FOR_REDIRECT,
    payload: string
}
export const setAlbumIdForRedirect = (id: string): SetAlbumIdForRedirectActionType =>{
    return {
        type: SET_ALBUM_ID_FOR_REDIRECT,
        payload: id
    }
}

export type SetCurrentProjectIdActionType = {
    type: typeof SET_CURRENT_PROJECT_ID,
    payload: string
}
export const setCurrentProjectId = (id: string): SetCurrentProjectIdActionType =>{
    return {
        type: SET_CURRENT_PROJECT_ID,
        payload: id
    }
}

export type ProjectsThunkType = ThunkAction<Promise<void> | void, AppStateType, unknown, ProjectsActionsTypes>

/*Thunk Creators*/
/**
 * Диапатчим в state проекты полученные с сервера
 * @returns {function(...[*]=)}
 */
export const getProjects = (): ProjectsThunkType => {
    return async (dispatch) => {
        const projects = await mongodbAPI.getProjects()
        dispatch(setProjects(projects))
    }
}

export const getProject = (id: string): ProjectsThunkType => {
    return async (dispatch) => {
        const project = await mongodbAPI.getProject(id)
        dispatch(setProject(project))
    }
}

export const getId = (id: string): ProjectsThunkType => {
    return (dispatch) => {
        dispatch(setId(id))
    }
}

export const getAllProjects = (): ProjectsThunkType => {
    return async (dispatch) => {
        const projects = await mongodbAPI.getAllProjects()
        dispatch(setProjects(projects))
    }
}

export const createProject = (title: string, description: string, text: string,
                              albumId: string, albumName: string, status: boolean): ProjectsThunkType =>{
    return async (dispatch) =>{
        const data = await mongodbAPI.createProject({title, description, text, albumId, albumName, status})
        if (data.resultCode === 0) {
            dispatch(getAllProjects())
        }
    }
}

export const updateProject = (id: string, title: string, description: string, text: string,
                              albumId: string, albumName:string, status: boolean, createAt: string): ProjectsThunkType =>{
    return async (dispatch) =>{
        const data = await mongodbAPI.updateProject({id, title, description, text, albumId, albumName, status, createAt})
        if (data.resultCode === 0) {
            dispatch(getAllProjects())
        }
    }
}

export const deleteProject = (id: string):ProjectsThunkType =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.deleteProject({id})
        if (data.resultCode === 0) {
            dispatch(getAllProjects())
        }
    }
}

export const getPhotos = (id: string): ProjectsThunkType => {
    //debugger
    return async (dispatch) => {
        const photos = await flickrAPI.getPhotos(id)
        dispatch(setProjectsPhotos(id, photos))
    }
}

export const getPhotoWithUrl = (id: string, card: PhotoType): ProjectsThunkType => {
    return async (dispatch) => {
        const photo = await flickrAPI.getPhoto(id)
        dispatch(setUrlToPhotos(photo, card))
    }
}

export const checkAlbum = (id: string): ProjectsThunkType =>{
    return async (dispatch) =>{
        const data = await flickrAPI.getPhotos(id)
        if (data) {
            dispatch(setAlbumIdForRedirect(data.photoset.id))
        }
    }
}
