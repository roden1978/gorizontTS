import React, {FC} from 'react'
import Project from "./Project/Project";
import {Container, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {PropsType} from "../Projects/ProjectsContainer";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    pos: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8),
    }
}));

const Projects:FC<PropsType> = (props) => {

    const classes = useStyles();

    let projectItems = props.projects.map(
        project => <Project key={project._id} {...project} {...props}/>
    )
    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="xl">
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={3}
                    className={classes.pos}
                >
                    {projectItems}

                </Grid>
            </Container>
        </div>
    );
}

export default Projects;
//"xs","sm","md","lg","xl"