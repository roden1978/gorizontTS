import React, {FC} from 'react'
import Job from './Job/Job'
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import {PropsType} from "./JobsContainer";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    pos:{
        paddingBottom: 20,
        paddingTop: 20,
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8),
    }
}));

const Jobs:FC<PropsType> = (props) => {
    //debugger
    const classes = useStyles();

    let jobs = props.jobs.map(
        job => <Job key={job._id} {...job} {...props}/>)

    return (
        <div className={classes.root}>
            <Container className={classes.cardGrid} maxWidth="md">
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
                spacing={3}
                className={classes.pos}
            >
                    {jobs}

            </Grid>
            </Container>
        </div>
    );
}

export default Jobs;
