import {makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 16,
        background:
            'linear-gradient(to bottom, #4e69a2, #3b5998 50%)',
        color: '#FFFFFF',
    },
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