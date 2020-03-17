import React from 'react';
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
} from '../../redux/actions/newsActions';
import {getProjects} from "../../redux/actions/projectsActions";
import News from "./News";
import {connect} from "react-redux";
import Spinner from "../../common/Spinner";

class NewsContainer extends React.Component {

    componentDidMount() {
        //debugger
        if (this.props.adminMode)
            this.props.getAllNews();
        else
            this.props.getNews();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.loadProjects) {
            this.props.getProjects();
            this.props.setLoadProjects(false);
        }
        if (this.props.getNewsItem) {
            this.props.setChangeNewsItem();
            this.props.setNewsItem(false);
        }

        if (this.props.isAllNews && this.props.adminMode) {
            setTimeout(null,2000);
            this.props.getAllNews();
            this.props.setIsAllNews(false);
        }
        if(this.props.news && this.props.news.length === 0){
            this.props.setDefaultNews();
        }
    }
    render() {
        return (<>
            {!this.props.news ? <Spinner/> : null}
            <News news = {this.props.news} {...this.props}
        />
        </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
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
};

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect(mapStateToProps,
    {   getNews, getProjects, setLoadProjects,
        setNewsItem, setChangeNewsItem, setIsAllNews,
        setCurrentNewsId, createNews, updateNews, getAllNews,
        deleteNews, setNewsCount, setDefaultNews, checkProject,
        setProjectIdForRedirect
    })(NewsContainer);

/*
news={this.props.news}
                      setLoadProjects={this.props.setLoadProjects}
                      setNewsItem={this.props.setNewsItem}
                      setIsAllNews={this.props.setIsAllNews}
                      projects={this.props.projects}
                      setCurrentNewsId={this.props.setCurrentNewsId}
                      createNews={this.props.createNews}
                      updateNews={this.props.updateNews}
                      deleteNews={this.props.deleteNews}
                      adminMode={this.props.adminMode}
                      setNewsCount={this.props.setNewsCount}
 */