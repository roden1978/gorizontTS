import React from 'react';
import {
    getProjects, getProject, getId,
    setLoadAlbums, getAllProjects, createProject,
    deleteProject, setChangeProjectsItem, setIsAllProjects,
    updateProject, setProjectsCount, setProjectsItem, setDefaultProject,
    getPhotos, getPhotoWithUrl, checkAlbum, setAlbumIdForRedirect
} from '../../redux/actions/projectsActions';
import {getPhotosets} from '../../redux/actions/photosActions'
import Projects from "./Projects";
import {connect} from "react-redux";
import Spinner from "../../common/Spinner";

class ProjectsContainer extends React.Component {
    updateProjectsData() {
        if (this.props.match.params.projectId) {
            this.props.getProject(this.props.match.params.projectId);
            this.props.getId(this.props.match.params.projectId);
            this.props.getPhotosets();
        } else {
            if (this.props.adminMode){
                this.props.getAllProjects();
            this.props.getPhotosets();
            }
            else {
                this.props.getProjects();
                this.props.getPhotosets();
            }

        }
    }

    componentDidMount() {
        this.updateProjectsData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.projectId !== prevProps.match.params.projectId)
            this.updateProjectsData()

        if (this.props.loadAlbums) {
            this.props.getPhotosets();
            this.props.setLoadAlbums(false);
        }
        if (this.props.getProjectsItem) {
            this.props.setChangeProjectsItem();
            this.props.setProjectsItem(false);
        }

        if (this.props.isAllProjects && this.props.adminMode) {
            this.props.getAllProjects();
            this.props.setIsAllProjects(false);
            setTimeout(null, 2000);
        }

       /* if (this.props.isAllProjects && !this.props.adminMode) {
            this.props.getProjects();
            this.props.setIsAllProjects(false);
        }*/
        if (this.props.projects.length === 0) {
            this.props.setDefaultProject();
        }
        //////////////////////////////////
        //debugger
        if (prevProps.albums.length === 0 && this.props.albums.length > 0) {
            this.props.albums.every((album) => this.props.getPhotos(album.id))
        }

        if (this.props.photosWithUrl.length === 0 && this.props.albumsCount === this.props.albums.length) {
            this.props.photos.every((card) => this.props.getPhotoWithUrl(card.id, card))
        }
    }

    componentWillUnmount() {
        this.props.getId(null);
        this.props.projects.length = 0;
    }

    render() {
        //debugger
        return (<>
            {this.props.projects.length === 0 ? <Spinner/> : null}
            <Projects {...this.props}/>
        </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state) => {
    return {
        projects: state.projects.projects,
        id: state.projects.id,
        albums: state.photos.sets,
        loadAlbums: state.projects.loadAlbums,
        getProjectsItem: state.projects.getProjectsItem,
        isAllProjects: state.projects.isAllProjects,
        projectsCount: state.projects.projectsCount,
        adminMode: state.auth.adminMode,
        photos: state.projects.photos,
        photosWithUrl: state.projects.photosWithUrl,
        albumsCount: state.projects.albumsCount,
        albumIdForRedirect: state.projects.albumIdForRedirect
    }
};

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect(mapStateToProps, {
    getProjects, getProject, getId, setLoadAlbums,
    getAllProjects, createProject, deleteProject,
    setChangeProjectsItem, setIsAllProjects,
    updateProject, setProjectsCount, setProjectsItem,
    getPhotosets, setDefaultProject, getPhotos, getPhotoWithUrl,
    checkAlbum, setAlbumIdForRedirect
})(ProjectsContainer);
