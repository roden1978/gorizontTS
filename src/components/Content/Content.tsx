import React from 'react'
import {useStyles} from './ContentStyles';
import {Redirect, Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom';
import ProjectsContainer from "../Projects/ProjectsContainer";
import JobsContainer from "../Jobs/JobsContainer";
import ContactsContainer from "../Contacts/ContactsContainer";
import AboutUsContainer from "../AboutUs/AboutUsContainer";
import Admin from "../Admin/Admin";
import Users from "../Users/UsersContainer";
import NewsContainer from "../News/NewsContainer";
import GalleryContainer from "../Gallery/GalleryContainer";
import PhotoAlbumContainer from "../PhotoAlbum/PhotoAlbumContainer";

type MatchParams = {
    projectId: string
}

type MatchProps = RouteComponentProps<MatchParams>

const Content = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect from='/' to='/news'/>}/>
                <Route path='/news' component={NewsContainer}/>
                <Route path='/projects/:projectId?' render = {
                    ({match}: MatchProps) => <ProjectsContainer projectId = {match.params.projectId}/>
                }/>
                <Route path='/gallery' component={GalleryContainer}/>
                <Route path='/album/:albumId?' component={PhotoAlbumContainer}/>
                <Route path='/contacts' component={ContactsContainer}/>
                <Route path='/about' component={AboutUsContainer}/>
                <Route path='/job' component={JobsContainer}/>
                <Route exact path='/admin' component={Admin}/>
                <Route exact path='/admin/users' component={Users}/>
                <Route path='*'
                       render={() => <div>Page not found: error 404</div>}/>
            </Switch>
        </div>
    )
}

export default withRouter(Content)
//component={ProjectsContainer}/>