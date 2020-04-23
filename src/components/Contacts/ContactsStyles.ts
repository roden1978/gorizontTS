import {makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        flexWrap: 'wrap'
    },
    pos: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8),
    },
    buttonSubmit: {
        margin: 10,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        backgroundColor: '#f5f6f7',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    media: {
        height: 0,
        paddingTop: '52.6%', // 16:9
    },
    table: {
        minWidth: 300,
    },
    adminPanel: {
        border: '2px solid grey',
        backgroundColor: '#e9ecf4'
    }
}))