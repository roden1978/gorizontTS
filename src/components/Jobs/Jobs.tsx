import React, {FC} from 'react'
import Job from './Job/Job'
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import {Container} from "@material-ui/core"
import {PropsType} from "./JobsContainer"
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

const Jobs: FC<PropsType> = (props) => {

    const classes = useStyles()

    let jobs = props.jobs.map(
        job => <Job key={job._id} {...job} {...props}/>)

    if (jobs.length !== 0)
        props.setIsShowSpinner(true)

    const currentPage = (event: any, page: number) => {
        props.setJobsCurrentPage(page)
        props.setIsAllJobs(true)
    }

    return (
        <div className={classes.root}>
            <Container className={classes.cardGrid} maxWidth="md">
                <Typography variant="h4" align="center">
                    РАБОТА
                </Typography>
                <div className={classes.containerCenter}>
                    {props.adminMode && props.jobs && props.jobsCount !== 0 ?
                        <Pagination count={Math.ceil(props.jobsCount / 10)}
                                    showFirstButton
                                    showLastButton
                                    page={props.currentPage}
                                    onChange={currentPage}/> : null}
                </div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                    className={classes.pos}
                >
                    {/*{jobs.length !== 0 ? jobs : <Typography variant="h5" align="center">
                        Объявления находятся в разработке или что-то пошло не так, попробуйте зайти позже. Приносим свои
                        извининения.
                    </Typography>}*/}
                    {jobs}

                </Grid>
                <div className={classes.containerCenter}>
                    {props.adminMode && props.jobs && props.jobsCount !== 0 ?
                        <Pagination count={Math.ceil(props.jobsCount / 10)}
                                    showFirstButton
                                    showLastButton
                                    page={props.currentPage}
                                    onChange={currentPage}/> : null}
                </div>
            </Container>
        </div>
    )
}

export default Jobs
