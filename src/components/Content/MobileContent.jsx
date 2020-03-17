import React from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import ProjectsContainer from "../Projects/ProjectsContainer";
import JobsContainer from "../Jobs/JobsContainer";
import ContactsContainer from "../Contacts/ContactsContainer";
import AboutUsContainer from "../AboutUs/AboutUsContainer";
import NewsContainer from "../News/NewsContainer";
import GalleryContainer from "../Gallery/GalleryContainer";
import PhotoAlbumContainer from "../PhotoAlbum/PhotoAlbumContainer";
import {useStyles} from "./ContentStyles";

const MobileContent = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.mobileContent}>
            <Switch>
                <Route exact path='/'
                       render={() => <Redirect from='/' to='/job'/>}/>
                <Route path='/news' component={NewsContainer}/>
                <Route path='/projects/:projectId?' component={ProjectsContainer}/>
                <Route path='/gallery' component={GalleryContainer}/>
                <Route path='/album/:albumId?' component={PhotoAlbumContainer}/>
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