import {makeStyles} from '@material-ui/core/styles'


export const useStyles = makeStyles(theme => ({
    titleHidden: {
        background:
            'linear-gradient(to bottom, #ffbbbb, #ffffff 80%)',
    },
    pos: {
        paddingLeft: 12,
    },
    buttonSubmit: {
        margin: 10,
    },
    avatar: {
        backgroundColor: 'white',
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
    adminPanel: {
        border: '2px solid grey',
        backgroundColor: '#e9ecf4'
    }
}))
//'linear-gradient(to bottom, #4e69a2, #3b5998 50%)' '#f5f6f7'