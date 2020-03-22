import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    link: {
        color: 'coral', // blueGrey[400],
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: 'lighter',
        fontSize: 14,
    },
    title: {
        fontSize: 24,
        background:
            'linear-gradient(to bottom, #4e69a2, #3b5998 50%)',
        color: '#FFFFFF',
    },
    titleHidden: {
        fontSize: 16,
        background:
            'linear-gradient(to bottom, #a24e4e, #983b3b 50%)',
        color: '#FFFFFF',
    },
    pos: {
        marginLeft: 12,
    },
    buttonSubmit: {
        margin: 10,
    },
    avatar: {
        backgroundColor: '#f5f6f7',
        width: 35,
        height: 35,
    },
    katok: {
        width: 30,
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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    wi: {
        backgroundColor: '#e9ecf4'
    },
    adminPanel: {
        border: '2px solid grey',
        backgroundColor: '#e9ecf4'
    }
}));