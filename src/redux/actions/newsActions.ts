import {mongodbAPI} from '../../api/api'
import {
    SET_NEWS,
    LOAD_PROJECTS,
    CHANGE_NEWS_ITEM,
    IS_ALL_NEWS,
    SET_NEWS_ITEM,
    SET_CURRENT_NEWS_ID,
    SET_NEWS_COUNT,
    SET_DEFAULT_NEWS,
    SET_PROJECT_ID_FOR_REDIRECT
} from "./types"
import {NewsType} from "../../tstypes/newsTypes"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store"

export type NewsActionsTypes = SetNewsActionType | SetLoadProjectsActionType | SetIsAllNewsActionType|
    SetChangeNewsItemActionType | SetNewsItemActionType | SetCurrentNewsIdActionType |
    SetNewsCountActionType | SetDefaultNewsActionType | SetProjectIdForRedirectActionType

export type SetNewsActionType = {
    type: typeof SET_NEWS
    payload: Array<NewsType>
}
/*Создаем объект action с обязательным свойством type*/
export const setNews = (news: Array<NewsType>): SetNewsActionType => {
    return {
        type: SET_NEWS,
        payload: news
    }
}

export type SetLoadProjectsActionType = {
    type: typeof LOAD_PROJECTS
    payload: boolean
}
export const setLoadProjects = (loadProjects: boolean): SetLoadProjectsActionType =>{
    return{
        type: LOAD_PROJECTS,
        payload: loadProjects
    }
}

export type SetIsAllNewsActionType = {
    type: typeof IS_ALL_NEWS
    payload: boolean
}
export const setIsAllNews = (isAllNews: boolean): SetIsAllNewsActionType =>{
    return{
        type: IS_ALL_NEWS,
        payload: isAllNews
    }
}

export type SetChangeNewsItemActionType = {
    type: typeof CHANGE_NEWS_ITEM
}
export const setChangeNewsItem = (): SetChangeNewsItemActionType =>{
    return{
        type: CHANGE_NEWS_ITEM
    }
}

export type SetNewsItemActionType = {
    type: typeof SET_NEWS_ITEM
    payload: boolean
}
export const  setNewsItem = (newsItem: boolean): SetNewsItemActionType =>{
    return {
        type: SET_NEWS_ITEM,
        payload: newsItem
    }
}

export type SetCurrentNewsIdActionType = {
    type: typeof SET_CURRENT_NEWS_ID
    payload: string
}
export const  setCurrentNewsId = (id: string): SetCurrentNewsIdActionType =>{
    return {
        type: SET_CURRENT_NEWS_ID,
        payload: id
    }
}

export type SetNewsCountActionType = {
    type: typeof SET_NEWS_COUNT
    payload: number
}
export const  setNewsCount = (count: number): SetNewsCountActionType =>{
    return {
        type: SET_NEWS_COUNT,
        payload: count
    }
}

export type SetDefaultNewsActionType = {
    type: typeof SET_DEFAULT_NEWS
}
export const setDefaultNews = (): SetDefaultNewsActionType =>{
    return{
        type: SET_DEFAULT_NEWS
    }
}

export type SetProjectIdForRedirectActionType = {
    type: typeof SET_PROJECT_ID_FOR_REDIRECT
    payload: string
}
export const  setProjectIdForRedirect = (id: string): SetProjectIdForRedirectActionType =>{
    return {
        type: SET_PROJECT_ID_FOR_REDIRECT,
        payload: id
    }
}

export type NewsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, NewsActionsTypes>
/*Thunk Creators*/
export const getNews = (): NewsThunkType => {
    return async (dispatch) => {
        const news = await mongodbAPI.getNews()
        dispatch(setNews(news))
    }
}

export const getAllNews = (): NewsThunkType => {
    return async (dispatch) => {
        const news = await mongodbAPI.getAllNews()
        dispatch(setNews(news))
    }
}

export const createNews = (title: string, text: string, project: string,
                           projectTitle: string, status: boolean): NewsThunkType =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.createNews({title, text, project, projectTitle, status})
        if (data.resultCode === 0) {
            dispatch(getAllNews())
        }
    }
}

export const updateNews = (id: string, title: string, text: string, project: string,
                           projectTitle: string, status: boolean, createAt: string): NewsThunkType =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.updateNews({id, title, text, project, projectTitle, status, createAt})
        if (data.resultCode === 0) {
            dispatch(getAllNews())
        }
    }
}

export const deleteNews = (id: string): NewsThunkType =>{
    //debugger
    return async (dispatch) =>{
        const data = await mongodbAPI.deleteNews({id})
        if (data.resultCode === 0) {
            dispatch(getAllNews())
        }
    }
}

export const checkProject = (id: string): NewsThunkType =>{
    return async (dispatch) =>{
        const data = await mongodbAPI.getProject(id)
        if (data) {
            dispatch(setProjectIdForRedirect(data._id))
        }
    }
}


