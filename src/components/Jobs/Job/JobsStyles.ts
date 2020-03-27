import {makeStyles} from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    price: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 16,
        background:
            'linear-gradient(to bottom, #4e69a2, #3b5998 50%)', //#0d47a1 #1976d2
        color: '#ffffff'
    },
    titleHidden: {
        fontSize: 16,
        background:
            'linear-gradient(to bottom, #a24e4e, #983b3b 50%)',
        color: '#FFFFFF',
    },
    pos: {
        marginLeft: 12,
        fontSize: 14,
        fontWeight: 'bold',
    },
    date: {
        marginLeft: 12
    },
    avatar: {
        backgroundColor: '#ffffff',
        width: 50,
        height: 50,
    },
    katok: {
        height: 45,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        minHeight: 160,
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
    wi: {
        backgroundColor: '#e9ecf4'
    },
    adminPanel: {
        border: '2px solid grey',
        backgroundColor: '#e9ecf4'
    }
}))
