import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
    title: {
        fontSize: 16,
        background:
            'linear-gradient(to bottom, #4e69a2, #3b5998 50%)',//#0d47a1
        color: '#FFFFFF',
    },
    wi: {
        backgroundColor: '#e9ecf4'
    },
    adminPanel: {
        border: '2px solid grey',
        backgroundColor: '#e9ecf4'
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
    }
}));