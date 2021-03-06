import React from 'react'
import {
    getNews,
    createNews,
    updateNews,
    deleteNews,
    getAllNews,
    checkProject,
    getNewsCount,
} from '../../redux/actions/newsActions'
import {newsActions} from '../../redux/actions/newsActions'
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
    currentPage: number
    pageSize: number
    isShowSpinner: boolean
}

export type MapDispatchToPropsType = {
    getAllNews: (currentPage: number, pageSize: number) => void
    getNews: () => void
    getProjects: () => void
    setLoadProjects: (setLoadProjects: boolean) => void
    setChangeNewsItem: () => void
    setNewsItem: (setNewsItem: boolean) => void
    setIsAllNews: (setIsAllNews: boolean) => void
    setDefaultNews: () => void
    setCurrentNewsId: (id: string) => void
    createNews: (title: string, text: string, project: string, projectTitle: string, status: boolean) => void
    updateNews: (_id: string, title: string, text: string, project: string,
                 projectTitle: string, status: boolean, createAt: string) => void
    deleteNews: (id: string) => void
    setNewsCount: (count: number) => void
    checkProject: (id: string) => void
    setProjectIdForRedirect: (id: string) => void
    setCurrentPage: (currentPage: number) => void
    getNewsCount: () => void
    setIsShowSpinner: (isShowSpinner: boolean) => void
}
export type PropsType = MapStateToPropsType & MapDispatchToPropsType
type PrevStateType = MapStateToPropsType

class NewsContainer extends React.Component<PropsType> {

    componentDidMount() {

        if (this.props.adminMode) {
            this.props.getNewsCount()
            this.props.getAllNews(this.props.currentPage, this.props.pageSize)
        } else
            this.props.getNews()

        setTimeout(() => {
            this.props.setIsShowSpinner(false)
        }, 3000);
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
            this.props.getNewsCount()
            this.props.getAllNews(this.props.currentPage, this.props.pageSize)
            this.props.setIsAllNews(false)
        }
        if (this.props.news && this.props.news.length === 0 && this.props.adminMode) {
            this.props.setDefaultNews()
        }
    }

    componentWillUnmount(): void {
        this.props.news.length = 0
    }

    render() {
        return (<>
            {this.props.news.length === 0 && this.props.isShowSpinner ? <Spinner/> : <News {...this.props}/>}
        </>)
    }
}

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
        projectIdForRedirect: state.news.projectIdForRedirect,
        currentPage: state.news.currentPage,
        pageSize: state.news.pageSize,
        isShowSpinner: state.news.isShowSpinner
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps,
    {
        getNews, getProjects, createNews, updateNews, getAllNews,
        deleteNews,checkProject,getNewsCount,
        setLoadProjects: newsActions.setLoadProjects,
        setNewsItem: newsActions.setNewsItem,
        setChangeNewsItem: newsActions.setChangeNewsItem,
        setIsAllNews: newsActions.setIsAllNews,
        setCurrentNewsId: newsActions.setCurrentNewsId,
        setNewsCount: newsActions.setNewsCount,
        setDefaultNews: newsActions.setDefaultNews,
        setProjectIdForRedirect: newsActions.setProjectIdForRedirect,
        setCurrentPage: newsActions.setCurrentPage,
        setIsShowSpinner: newsActions.setIsShowSpinner
    })(NewsContainer)
