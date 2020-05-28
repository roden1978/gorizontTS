import React from 'react'
import {Redirect, Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom'
import ProjectsContainer from "../Projects/ProjectsContainer"
import JobsContainer from "../Jobs/JobsContainer"
import ContactsContainer from "../Contacts/ContactsContainer"
import AboutUsContainer from "../AboutUs/AboutUsContainer"
import NewsContainer from "../News/NewsContainer"
import GalleryContainer from "../Gallery/GalleryContainer"
import PhotoAlbumContainer from "../PhotoAlbum/PhotoAlbumContainer"
import {useStyles} from "./ContentStyles"

type MatchParams = {
    projectId: string
    albumId: string
}

type MatchProps = RouteComponentProps<MatchParams>

const MobileContent = () => {
    const classes = useStyles()
    return (
        <div className={classes.mobileContent}>
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect from='/' to='/job'/>}/>
                <Route path='/news' component={NewsContainer}/>
                <Route path='/projects/:projectId?' render = {
                    ({match}: MatchProps) => <ProjectsContainer projectId = {match.params.projectId}/>
                }/>
                <Route path='/gallery' component={GalleryContainer}/>
                <Route path='/album/:albumId?' render = {
                    ({match}: MatchProps) => <PhotoAlbumContainer albumId = {match.params.albumId}/>
                }/>
                <Route path='/contacts' render={(props)=><ContactsContainer {...props} mobile = {true}/>}/>
                <Route path='/about' component={AboutUsContainer}/>
                <Route path='/job' component={JobsContainer}/>
                <Route path='*'
                       render={() => <div>Page not found: error 404</div>}/>
            </Switch>
        </div>
    )
}

export default withRouter(MobileContent)