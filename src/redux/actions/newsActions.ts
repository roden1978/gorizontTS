import {mongodbAPI} from '../../api/api'
import {NewsType} from "../../tstypes/newsTypes"
import {ThunkAction} from "redux-thunk"
import {ActionsTypes, AppStateType} from "../store"

export type NewsActionsTypes = ActionsTypes<typeof newsActions>

export const newsActions = {
    setNews: (news: Array<NewsType>) => (
        {
            type: 'GT/NEWS/SET_NEWS',
            payload: news
        } as const
    ),
    setLoadProjects: (loadProjects: boolean) => (
        {
            type: 'GT/NEWS/LOAD_PROJECTS',
            payload: loadProjects
        } as const
),
    setIsAllNews: (isAllNews: boolean) => (
        {
            type: 'GT/NEWS/IS_ALL_NEWS',
            payload: isAllNews
        } as const
    ),
    setChangeNewsItem: () => (
        {
            type: 'GT/NEWS/CHANGE_NEWS_ITEM'
        } as const
    ),
    setNewsItem: (newsItem: boolean) => (
        {
            type: 'GT/NEWS/SET_NEWS_ITEM',
            payload: newsItem
        } as const
    ),
    setCurrentNewsId: (id: string) => (
        {
            type: 'GT/NEWS/SET_CURRENT_NEWS_ID',
            payload: id
        } as const
    ),
    setNewsCount: (count: number) => (
        {
            type: 'GT/NEWS/SET_NEWS_COUNT',
            payload: count
        } as const
    ),
    setDefaultNews: () => (
        {
            type: 'GT/NEWS/SET_DEFAULT_NEWS'
        } as const
    ),
    setProjectIdForRedirect: (id: string) => (
        {
            type: 'GT/NEWS/SET_PROJECT_ID_FOR_REDIRECT',
            payload: id
        } as const
    ),
    setCurrentPage: (currentPage: number) => (
        {
            type: 'GT/NEWS/SET_CURRENT_PAGE',
            payload: currentPage
        } as const
    ),
    setIsShowSpinner: (isShowSpinner: boolean) => (
        {
            type: 'GT/NEWS/SET_NEWS_IS_SHOW_SPINNER',
            payload: isShowSpinner
        } as const
    )
}


export type NewsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, NewsActionsTypes>
/*Thunk Creators*/
export const getNews = (): NewsThunkType => {
    return async (dispatch) => {
        const news = await mongodbAPI.getNews()
        if (news)
            dispatch(newsActions.setNews(news))
    }
}

export const getAllNews = (currentPage: number, pageSize: number): NewsThunkType => {
    return async (dispatch) => {
        const news = await mongodbAPI.getAllNews(currentPage, pageSize)
        if (news)
            dispatch(newsActions.setNews(news))
    }
}

export const createNews = (title: string, text: string, project: string,
                           projectTitle: string, status: boolean): NewsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.createNews({title, text, project, projectTitle, status})
        if (data.resultCode === 0) {
            dispatch(newsActions.setIsAllNews(true))
        }
    }
}

export const updateNews = (_id: string, title: string, text: string, project: string,
                           projectTitle: string, status: boolean, createAt: string): NewsThunkType => {
    //debugger
    return async (dispatch) => {
        const data = await mongodbAPI.updateNews({_id, title, text, project, projectTitle, status, createAt})
        if (data.resultCode === 0) {
            dispatch(newsActions.setIsAllNews(true))
        }
    }
}

export const deleteNews = (_id: string): NewsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.deleteNews(_id)
        if (data.resultCode === 0) {
            dispatch(newsActions.setIsAllNews(true))
        }
    }
}

export const checkProject = (id: string): NewsThunkType => {
    return async (dispatch) => {
        const data = await mongodbAPI.getProject(id)
        if (data) {
            dispatch(newsActions.setProjectIdForRedirect(data._id))
        }
    }
}

export const getNewsCount = (): NewsThunkType => {
    return async (dispatch) => {
        const count = await mongodbAPI.getNewsCount()
        if (count)
            dispatch(newsActions.setNewsCount(count))
    }
}

