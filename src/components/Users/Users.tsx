import React, {FC} from 'react'
import User from './UsersItem/User'
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import {Container} from "@material-ui/core"
import {PropsType} from "./UsersContainer";

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
}))

const Users:FC<PropsType> = (props) => {
    const classes = useStyles()

    let usersItems = props.users.map(
        usersItem => <User key={usersItem._id}
                           {...usersItem}
                           {...props}/>)

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
                    {usersItems}
                </Grid>
            </Container>
        </div>
    )
}

export default Users