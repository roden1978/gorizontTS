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
        case 'GT/NEWS/SET_NEWS': {
            return {
                ...state, news: action.payload
            }
        }
        case "GT/NEWS/LOAD_PROJECTS":{
            return {
                ...state, loadProjects: action.payload
            }
        }
        case "GT/NEWS/IS_ALL_NEWS":{
            return {
                ...state, isAllNews: action.payload
            }
        }
        case "GT/NEWS/SET_NEWS_ITEM":{
            return {
                ...state, getNewsItem: action.payload
            }
        }
        case "GT/NEWS/CHANGE_NEWS_ITEM" :{
            const newsItem = state.news.find((item) =>item._id === state.currentNewsId)
            return {
                ...state, news: [newsItem!]
            }
        }
        case "GT/NEWS/SET_CURRENT_NEWS_ID" :{
            return{
                ...state, currentNewsId: action.payload
            }
        }
        case "GT/NEWS/SET_NEWS_COUNT" :{
            return{
                ...state, newsCount: action.payload
            }
        }
        case "GT/NEWS/SET_DEFAULT_NEWS" :{
            return{
                ...state, news: [{_id: '0', title: 'Создайте первую новость',
                    text: 'Если созданная новость не отобразилась обновите запись.',
                    project: '1', projectTitle: '', status: true, createAt: ''}]
            }
        }
        case "GT/NEWS/SET_PROJECT_ID_FOR_REDIRECT" :{
            return{
                ...state, projectIdForRedirect: action.payload
            }
        }
        case "GT/NEWS/SET_CURRENT_PAGE" :{
            return{
                ...state, currentPage: action.payload
            }
        }
        case "GT/NEWS/SET_NEWS_IS_SHOW_SPINNER" :{
            return{
                ...state, isShowSpinner: action.payload
            }
        }
        default:
            return state
    }
}

export default news_reducer