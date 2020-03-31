import {makeStyles} from "@material-ui/core";

export  const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        transform: 'translateZ(0)',
        backgroundColor: '#e9ecf4',
    },
    gridList: {
        backgroundColor: '#e9ecf4', //f5f6f7
        flexDirection: 'row',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    im: {
        width: '120%',
    },
    avatar: {
        backgroundColor: '#f5f6f7',
        width: 40,
        height: 40,
        color: 'rgba(255, 255, 255, 0.54)',
    },
    katok: {
        width: 35,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}))