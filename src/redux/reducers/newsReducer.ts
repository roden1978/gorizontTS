import {
    SET_NEWS, LOAD_PROJECTS, CHANGE_NEWS_ITEM,
    IS_ALL_NEWS, SET_NEWS_ITEM, SET_CURRENT_NEWS_ID,
    SET_NEWS_COUNT, SET_DEFAULT_NEWS, SET_PROJECT_ID_FOR_REDIRECT
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
    projectIdForRedirect: ''
}

export type InitialStateType = typeof initialState

const news_reducer = (state = initialState, action: NewsActionsTypes):InitialStateType => {

    //let copyState// = {...state}

    //debugger
    switch (action.type) {
        case SET_NEWS: {
            /*копия МАССИВОВ в КВАДРАТНЫХ СКОБКАХ
            * копия  ПРИМИТИВОВ в ФИГУРНЫХ СКОБКАХ
            * копия ОБЪЕКТОВ И ПОДОБЪЕКТОВ в ФИГУРНЫХ СКОБКАХ*/
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
                ...state, news: [{_id: '0', title: 'Войдите в панель администирования и создайте новость',
                    text: '!!!ВНИМАНИЕ!!! Перед созданием новостей должен быть создан хотя бы один проект, ' +
                        'если созданная новость не отобразилась обновите страницу.',
                    project: '', projectTitle: '', status: true, createAt: ''}]
            }
        }
        case SET_PROJECT_ID_FOR_REDIRECT :{
            return{
                ...state, projectIdForRedirect: action.payload
            }
        }
        default:
            return state
    }
}

export default news_reducer