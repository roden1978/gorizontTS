import {mongodbAPI} from '../../api/api'
import {
    CHANGE_NEWS_ITEM,
    IS_ALL_NEWS,
    LOAD_PROJECTS,
    SET_CURRENT_NEWS_ID,
    SET_NEWS_CURRENT_PAGE,
    SET_DEFAULT_NEWS,
    SET_NEWS,
    SET_NEWS_COUNT,
    SET_NEWS_ITEM,
    SET_PROJECT_ID_FOR_REDIRECT
} from "./types"
import {NewsType} from "../../tstypes/newsTypes"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store"

export type NewsActionsTypes = SetNewsActionType | SetLoadProjectsActionType | SetIsAllNewsActionType |
    SetChangeNewsItemActionType | SetNewsItemActionType | SetCurrentNewsIdActionType |
    SetNewsCountActionType | SetDefaultNewsActionType | SetProjectIdForRedirectActionType |
    SetCurrentPageType

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
export const setLoadProjects = (loadProjects: boolean): SetLoadProjectsActionType => {
    return {
        type: LOAD_PROJECTS,
        payload: loadProjects
    }
}

export type SetIsAllNewsActionType = {
    type: typeof IS_ALL_NEWS
    payload: boolean
}
export const setIsAllNews = (isAllNews: boolean): SetIsAllNewsActionType => {
    return {
        type: IS_ALL_NEWS,
        payload: isAllNews
    }
}

export type SetChangeNewsItemActionType = {
    type: typeof CHANGE_NEWS_ITEM
}
export const setChangeNewsItem = (): SetChangeNewsItemActionType => {
    return {
        type: CHANGE_NEWS_ITEM
    }
}

export type SetNewsItemActionType = {
    type: typeof SET_NEWS_ITEM
    payload: boolean
}
export const setNewsItem = (newsItem: boolean): SetNewsItemActionType => {
    return {
        type: SET_NEWS_ITEM,
        payload: newsItem
    }
}

export type SetCurrentNewsIdActionType = {
    type: typeof SET_CURRENT_NEWS_ID
    payload: string
}
export const setCurrentNewsId = (id: string): SetCurrentNewsIdActionType => {
    return {
        type: SET_CURRENT_NEWS_ID,
        payload: id
    }
}

export type SetNewsCountActionType = {
    type: typeof SET_NEWS_COUNT
    payload: number
}
export const setNewsCount = (count: number): SetNewsCountActionType => {
    return {
        type: SET_NEWS_COUNT,
        payload: count
    }
}

export type SetDefaultNewsActionType = {
    type: typeof SET_DEFAULT_NEWS
}
export const setDefaultNews = (): SetDefaultNewsActionType => {
    return {
        type: SET_DEFAULT_NEWS
    }
}

export type SetProjectIdForRedirectActionType = {
    type: typeof SET_PROJECT_ID_FOR_REDIRECT
    payload: string
}
export const setProjectIdForRedirect = (id: string): SetProjectIdForRedirectActionType => {
    return {
        type: SET_PROJECT_ID_FOR_REDIRECT,
        payload: id
    }
}

export type SetCurrentPageType = {
    type: typeof SET_NEWS_CURRENT_PAGE
    payload: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType =>{
    return {
        type: SET_NEWS_CURRENT_PAGE,
        payload: currentPage
    }
}

export type NewsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, NewsActionsTypes>
/*Thunk Creators*/
export const getNews = (): NewsThunkType => {
    return async (dispatch) => {
        const news = await mongodbAPI.getNews()
        if (news)
            dispatch(setNews(news))
    }
}

export const getAllNews = (currentPage: number, pageSize: number): NewsThunkType => {
    return async (dispatch) => {
        const news = await mongodbAPI.getAllNews(currentPage, pageSize)
        if (news)
            dispatch(setNews(news))
    }
}

export const createNews = (title: string, text: string, project: string,
                           projectTitle: string, status: boolean): NewsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.createNews({title, text, project, projectTitle, status})
        if (data.resultCode === 0) {
            //dispatch(getAllNews(currentPage, pageSize))
            dispatch(setIsAllNews(true))
        }
    }
}

export const updateNews = (_id: string, title: string, text: string, project: string,
                           projectTitle: string, status: boolean, createAt: string): NewsThunkType => {
    //debugger
    return async (dispatch) => {
        const data = await mongodbAPI.updateNews({_id, title, text, project, projectTitle, status, createAt})
        if (data.resultCode === 0) {
            //dispatch(getAllNews())
            dispatch(setIsAllNews(true))
        }
    }
}

export const deleteNews = (_id: string): NewsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.deleteNews(_id)
        if (data.resultCode === 0) {
            //dispatch(getAllNews())
            dispatch(setIsAllNews(true))
        }
    }
}

export const checkProject = (id: string): NewsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.getProject(id)
        if (data) {
            dispatch(setProjectIdForRedirect(data._id))
        }
    }
}

export const getNewsCount = (): NewsThunkType =>{
    return async (dispatch) => {
        const count = await mongodbAPI.getNewsCount()
        if(count)
            dispatch(setNewsCount(count))
    }
}

