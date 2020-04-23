import React, {FC} from 'react'
import Project from "./Project/Project"
import {Container, makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {PropsType} from "../Projects/ProjectsContainer"
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

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
    },
    containerCenter: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))

const Projects: FC<PropsType> = (props) => {

    const classes = useStyles()

    let projectItems = props.projects.map(
        project => <Project key={project._id} {...project} {...props}/>
    )
    if (projectItems.length !== 0)
        props.setIsShowSpinner(true)

    const currentPage = (event: any, page: number) => {
        props.setProjectsCurrentPage(page)
        props.setIsAllProjects(true)
    }

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="xl">
                <Typography variant="h4" align="center">
                    ПРОЕКТЫ
                </Typography>
                <div className={classes.containerCenter}>
                    {props.adminMode && props.projects && props.projectsCount !== 0 ?
                        <Pagination count={Math.ceil(props.projectsCount / 10)}
                                    showFirstButton
                                    showLastButton
                                    page={props.currentPage}
                                    onChange={currentPage}/> : null}
                </div>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={3}
                    className={classes.pos}
                >
                    {/*{projectItems.length !== 0 ? projectItems : <Typography variant="h5" align="center">
                        Проекты находятся в разработке или что-то пошло не так, попробуйте зайти позже. Приносим свои
                        извининения.
                    </Typography>}*/}
                    {projectItems}

                </Grid>
                <div className={classes.containerCenter}>
                    {props.adminMode && props.projects && props.projectsCount !== 0 ?
                        <Pagination count={Math.ceil(props.projectsCount / 10)}
                                    showFirstButton
                                    showLastButton
                                    page={props.currentPage}
                                    onChange={currentPage}/> : null}
                </div>
            </Container>
        </div>
    )
}

export default Projects