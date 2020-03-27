import React from 'react'
import {
    getNews,
    setLoadProjects,
    setNewsItem,
    setChangeNewsItem,
    setCurrentNewsId,
    createNews,
    updateNews,
    deleteNews,
    getAllNews,
    setIsAllNews,
    setNewsCount,
    setDefaultNews,
    checkProject,
    setProjectIdForRedirect
} from '../../redux/actions/newsActions'
import {getProjects} from "../../redux/actions/projectsActions"
import News from "./News"
import {connect} from "react-redux"
import Spinner from "../../common/Spinner"
import {AppStateType} from "../../redux/store"
import {NewsType} from "../../tstypes/newsTypes"
import {ProjectsType} from "../../tstypes/projectsTypes"

export type MapStateToPropsType = {
    news: Array<NewsType>
    loadProjects: boolean
    projects: Array<ProjectsType>
    isAllNews: boolean
    getNewsItem: boolean
    currentNewsId: string
    newsCount: number
    adminMode: boolean
    projectIdForRedirect: string
}

export type MapDispatchToPropsType = {
    getAllNews: () => void
    getNews: () => void
    getProjects: () => void
    setLoadProjects: (setLoadProjects: boolean) => void
    setChangeNewsItem: () => void
    setNewsItem: (setNewsItem: boolean) => void
    setIsAllNews: (setIsAllNews: boolean) => void
    setDefaultNews: () => void
    setCurrentNewsId: (id: string) => void
    createNews: (title: string, text: string, project: string, projectTitle: string, status: boolean) => void
    updateNews: (id: string, title: string, text: string, project: string,
                 projectTitle: string, status: boolean, createAt: string) => void
    deleteNews: (id: string) => void
    setNewsCount: (count: number) => void
    checkProject: (id: string) => void
    setProjectIdForRedirect: (id: string) => void
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType
type PrevStateType = MapStateToPropsType

class NewsContainer extends React.Component<PropsType> {

    componentDidMount() {

        if (this.props.adminMode)
            this.props.getAllNews()
        else
            this.props.getNews()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateType) {
        if (this.props.loadProjects) {
            this.props.getProjects()
            this.props.setLoadProjects(false)
        }
        if (this.props.getNewsItem) {
            this.props.setChangeNewsItem()
            this.props.setNewsItem(false)
        }

        if (this.props.isAllNews && this.props.adminMode) {
            this.props.getAllNews()
            this.props.setIsAllNews(false)
        }
        if (this.props.news && this.props.news.length === 0) {
            this.props.setDefaultNews()
        }
    }

    render() {
        return (<>
            {!this.props.news && this.props.news!.length === 0 ? <Spinner/> : null}
            <News {...this.props}
            />
        </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        news: state.news.news,
        loadProjects: state.news.loadProjects,
        projects: state.projects.projects,
        isAllNews: state.news.isAllNews,
        getNewsItem: state.news.getNewsItem,
        currentNewsId: state.news.currentNewsId,
        newsCount: state.news.newsCount,
        adminMode: state.auth.adminMode,
        projectIdForRedirect: state.news.projectIdForRedirect
    }
}

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
    {
        getNews, getProjects, setLoadProjects,
        setNewsItem, setChangeNewsItem, setIsAllNews,
        setCurrentNewsId, createNews, updateNews, getAllNews,
        deleteNews, setNewsCount, setDefaultNews, checkProject,
        setProjectIdForRedirect
    })(NewsContainer)
