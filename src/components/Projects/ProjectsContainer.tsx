import React from 'react'
import {
    getProjects, getProject, getId,
    setLoadAlbums, getAllProjects, createProject,
    deleteProject, setChangeProjectsItem, setIsAllProjects,
    updateProject, setProjectsCount, setProjectsItem, setDefaultProject,
    getPhotos, getPhotoWithUrl, checkAlbum, setAlbumIdForRedirect,
    setCurrentProjectId, setProjectsCurrentPage, getProjectsCount,
    setIsShowSpinner
} from '../../redux/actions/projectsActions'
import {getPhotosets} from '../../redux/actions/photosActions'
import Projects from "./Projects"
import {connect} from "react-redux"
import Spinner from "../../common/Spinner"
import {AppStateType} from "../../redux/store"
import {ProjectsType} from "../../tstypes/projectsTypes"
import {PhotoAlbumType, PhotoType} from "../../tstypes/photosTypes"

export type MapStateToPropsType = {
    projects: Array<ProjectsType>
    id: string
    albums: Array<PhotoAlbumType>
    loadAlbums: boolean
    getProjectsItem: boolean
    isAllProjects: boolean
    projectsCount: number
    adminMode: boolean
    photos: Array<PhotoType>
    photosWithUrl: Array<PhotoType>
    albumsCount: number
    albumIdForRedirect: string
    currentProjectId: string,
    currentPage: number,
    pageSize: number,
    isShowSpinner: boolean
}
type PrevStateProps = MapStateToPropsType

export type MapDispatchToPropsType = {
    getProjects: () => void
    getProject: (projectId: string) => void
    getId: (projectId: string) => void
    setLoadAlbums: (setLoadAlbums: boolean) => void
    getAllProjects: (currentPage: number, pageSize: number) => void
    createProject: (title: string, description: string, text: string,
                    albumId: string, albumName: string, status: boolean, createAt: string) => void
    deleteProject: (id: string) => void
    setChangeProjectsItem: () => void
    setIsAllProjects: (setIsAllProjects: boolean) => void
    updateProject: (_id: string, title: string, description: string, text: string,
                    albumId: string, albumName: string, status: boolean, createAt: string) => void
    setProjectsCount: (count: number) => void
    setProjectsItem: (setProjectsItem: boolean) => void
    getPhotosets: () => void
    setDefaultProject: () => void
    getPhotos: (id: string) => void
    getPhotoWithUrl: (id: string, card: PhotoType) => void
    checkAlbum: (albumId: string) => void
    setAlbumIdForRedirect: (id: string) => void
    setCurrentProjectId: (id: string) => void
    setProjectsCurrentPage: (currentPage: number) => void
    getProjectsCount:() => void
    setIsShowSpinner: (isShowSpinner: boolean) => void
}

type OwnProps = {
    projectId: string
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps

class ProjectsContainer extends React.Component<PropsType> {
    updateProjectsData() {
        if (this.props.projectId) {
            this.props.getProject(this.props.projectId)
            this.props.getId(this.props.projectId)
            this.props.getPhotosets()
        } else {
            if (this.props.adminMode) {
                this.props.getProjectsCount()
                this.props.getAllProjects(this.props.currentPage, this.props.pageSize)
                this.props.getPhotosets()
            } else {
                this.props.getProjects()
                this.props.getPhotosets()
            }

        }
    }

    componentDidMount() {
        this.updateProjectsData()
        
        setTimeout(() => {
            this.props.setIsShowSpinner(false)
        }, 3000);
    }

    componentDidUpdate(prevProps: PropsType, prevState: PrevStateProps) {
        if (this.props.projectId !== prevProps.projectId)
            this.updateProjectsData()

        if (this.props.loadAlbums) {
            this.props.getPhotosets()
            this.props.setLoadAlbums(false)
        }
        if (this.props.getProjectsItem) {
            this.props.setChangeProjectsItem()
            this.props.setProjectsItem(false)
        }

        if (this.props.isAllProjects && this.props.adminMode) {
            this.props.getProjectsCount()
            this.props.getAllProjects(this.props.currentPage, this.props.pageSize)
            this.props.setIsAllProjects(false)
        }

        if (this.props.projects && this.props.projects.length === 0 && this.props.adminMode) {
            this.props.setDefaultProject()
        }

        if (prevProps.albums.length === 0 && this.props.albums.length > 0) {
            this.props.albums.every((album) => this.props.getPhotos(album.id))
        }

        if (this.props.photosWithUrl.length === 0 && this.props.albumsCount === this.props.albums.length) {
            this.props.photos.every((card) => this.props.getPhotoWithUrl(card.id, card))
        }
    }

    componentWillUnmount(): void {
        this.props.getId('')
        this.props.projects.length = 0
    }

    render() {
        //debugger
        return (<>
            {this.props.projects.length === 0 && this.props.isShowSpinner ? <Spinner/> : <Projects {...this.props}/>}
        </>)
    }
}

/*функция принимает state созданный в redux при помощи reducers
* и возвращает требуемые нам данные из state*/
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        projects: state.projects.projects,
        id: state.projects.id,
        albums: state.photos.sets,
        loadAlbums: state.projects.loadAlbums,
        getProjectsItem: state.projects.getProjectsItem,
        isAllProjects: state.projects.isAllProjects,
        projectsCount: state.projects.projectsCount,
        currentProjectId: state.projects.currentProjectId,
        adminMode: state.auth.adminMode,
        photos: state.projects.photos,
        photosWithUrl: state.projects.photosWithUrl,
        albumsCount: state.projects.albumsCount,
        albumIdForRedirect: state.projects.albumIdForRedirect,
        currentPage: state.projects.currentPage,
        pageSize: state.projects.pageSize,
        isShowSpinner: state.projects.isShowSpinner
    }
}

/*Создаем контейнерную кмпоненту MyNewsContainer*/
/*Двойные скобки обозначют что мы вызвали фукцию connect, а она
* в свою очередь возвращает нам фукцию во вторых скобках*/
export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, {
    getProjects, getProject, getId, setLoadAlbums,
    getAllProjects, createProject, deleteProject,
    setChangeProjectsItem, setIsAllProjects,
    updateProject, setProjectsCount, setProjectsItem,
    getPhotosets, setDefaultProject, getPhotos, getPhotoWithUrl,
    checkAlbum, setAlbumIdForRedirect, setCurrentProjectId,
    setProjectsCurrentPage, getProjectsCount, setIsShowSpinner
})(ProjectsContainer)
