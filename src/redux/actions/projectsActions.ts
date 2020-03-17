import {flickrAPI, mongodbAPI} from '../../api/api'
import {
    SET_PROJECTS,
    SET_PROJECT,
    SET_ID,
    IS_ALL_PROJECTS,
    CHANGE_PROJECTS_ITEM,
    SET_PROJECTS_ITEM,
    SET_PROJECTS_COUNT,
    LOAD_ALBUMS,
    SET_DEFAULT_PROJECT,
    SET_PROJECTS_PHOTOS,
    SET_URL_TO_PROJECTS_PHOTOS,
    SET_ALBUM_ID_FOR_REDIRECT
} from "./types";

import {PhotoType, ProjectType} from "../reducers/projectsReducer";

export type SetProjectsActionType = {
    type: typeof SET_PROJECTS
    payload: Array<ProjectType>
}
/*Создаем объект action с обязательным свойством type*/
export const setProjects = (projects: Array<ProjectType>): SetProjectsActionType => {
    return {
        type: SET_PROJECTS,
        payload: projects
    }
}

export type SetProjectActionType = {
    type: typeof SET_PROJECT
    payload: ProjectType
}
export const setProject = (project: ProjectType): SetProjectActionType => {
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
    payload: ProjectType
}
export const setProjectsItem = (projectsItem: ProjectType): SetProjectsItemActionType =>{
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
    photos: Array<PhotoType>
}
export const setProjectsPhotos = (id: string, photos: Array<PhotoType>): SetProjectsPhotosActionType =>{
    return{
        type: SET_PROJECTS_PHOTOS,
        id: id,
        photos: photos
    }
}

export type SetUrlToPhotosActionType = {
    type: typeof SET_URL_TO_PROJECTS_PHOTOS
    payload: Array<PhotoType>
    card: PhotoType
}
export const setUrlToPhotos = (photo: Array<PhotoType>, card: PhotoType): SetUrlToPhotosActionType => {
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

/*Thunk Creators*/
/**
 * Диапатчим в state проекты полученные с сервера
 * @returns {function(...[*]=)}
 */
export const getProjects = () => {
    return async (dispatch: any) => {
        const projects = await mongodbAPI.getProjects();
        dispatch(setProjects(projects));
    }
}

export const getProject = (id: string) => {
    return async (dispatch: any) => {
        const project = await mongodbAPI.getProject(id);
        dispatch(setProject(project));
    }
}

export const getId = (id:string) => {
    return (dispatch: any) => {
        dispatch(setId(id));
    }
}

export const getAllProjects = () => {
    return async (dispatch: any) => {
        const projects = await mongodbAPI.getAllProjects();
        dispatch(setProjects(projects));
    }
}


/*export type CreateProjectType = {
    title: string
    description: string
    text: string
    albumId: string
    albumName: string
    status: boolean
}*/
export const createProject = (title: string, description: string, text: string, albumId: string, albumName: string, status: boolean) =>{
    //debugger
    return async (dispatch: any) =>{
        const data = await mongodbAPI.createProject({title, description, text, albumId, albumName, status});
        if (data.resultCode === 0) {
            dispatch(getAllProjects());
        }
    }
}

export const updateProject = (id: string, title: string, description: string, text: string, albumId: string, albumName:string, status: boolean, createAt: string) =>{
    //debugger
    return async (dispatch: any) =>{
        const data = await mongodbAPI.updateProject({id, title, description, text, albumId, albumName, status, createAt});
        if (data.resultCode === 0) {
            dispatch(getAllProjects());
        }
    }
}

export const deleteProject = (id: string) =>{
    //debugger
    return async (dispatch: any) =>{
        const data = await mongodbAPI.deleteProject({id});
        if (data.resultCode === 0) {
            dispatch(getAllProjects());
        }
    }
}

export const getPhotos = (id: string) => {
    //debugger
    return async (dispatch: any) => {
        const photos = await flickrAPI.getPhotos(id);
        dispatch(setProjectsPhotos(id, photos));
    }
}

export const getPhotoWithUrl = (id: string, card: any) => {
    return async (dispatch: any) => {
        const photo = await flickrAPI.getPhoto(id);
        dispatch(setUrlToPhotos(photo, card));
    }
}

export const checkAlbum = (id: string) =>{
    return async (dispatch: any) =>{
        const data = await flickrAPI.getPhotos(id);
        if (data) {
            dispatch(setAlbumIdForRedirect(data.photoset.id))
        }
    }
}
