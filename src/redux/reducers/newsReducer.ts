import {
    SET_NEWS, LOAD_PROJECTS, CHANGE_NEWS_ITEM,
    IS_ALL_NEWS, SET_NEWS_ITEM, SET_CURRENT_NEWS_ID,
    SET_NEWS_COUNT, SET_DEFAULT_NEWS, SET_PROJECT_ID_FOR_REDIRECT,
    SET_NEWS_CURRENT_PAGE, SET_NEWS_IS_SHOW_SPINNER
} from "../actions/types"
import {NewsType} from "../../tstypes/newsTypes"
import {NewsActionsTypes} from "../actions/newsActions"

let initialState = {
    news: [] as Array<NewsType>,
    loadProjects: false,
    getNewsItem: false,
    isAllNews: false,
    currentNewsId: '',
    newsCount: 0,
    projectIdForRedirect: '0',
    currentPage: 1,
    pageSize: 10,
    isShowSpinner: true
}

export type InitialStateType = typeof initialState

const news_reducer = (state = initialState, action: NewsActionsTypes):InitialStateType => {

    switch (action.type) {
        case SET_NEWS: {
            return {
                ...state, news: action.payload
            }
        }
        case  LOAD_PROJECTS:{
            return {
                ...state, loadProjects: action.payload
            }
        }
        case  IS_ALL_NEWS:{
            return {
                ...state, isAllNews: action.payload
            }
        }
        case  SET_NEWS_ITEM:{
            return {
                ...state, getNewsItem: action.payload
            }
        }
        case CHANGE_NEWS_ITEM:{
            const newsItem = state.news.find((item) =>item._id === state.currentNewsId)
            return {
                ...state, news: [newsItem!]
            }
        }
        case SET_CURRENT_NEWS_ID :{
            return{
                ...state, currentNewsId: action.payload
            }
        }
        case SET_NEWS_COUNT :{
            return{
                ...state, newsCount: action.payload
            }
        }
        case SET_DEFAULT_NEWS :{
            return{
                ...state, news: [{_id: '0', title: 'Создайте первую новость',
                    text: 'Если созданная новость не отобразилась обновите запись.',
                    project: '1', projectTitle: '', status: true, createAt: ''}]
            }
        }
        case SET_PROJECT_ID_FOR_REDIRECT :{
            return{
                ...state, projectIdForRedirect: action.payload
            }
        }
        case SET_NEWS_CURRENT_PAGE :{
            return{
                ...state, currentPage: action.payload
            }
        }
        case SET_NEWS_IS_SHOW_SPINNER :{
            return{
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default news_reducer