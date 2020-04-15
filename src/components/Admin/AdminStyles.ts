import {makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
    buttonSubmit: {
        margin: 10,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
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