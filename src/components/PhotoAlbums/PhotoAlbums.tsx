import React, {FC} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import katok from '../../assets/icons/katok.svg'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {useHistory} from 'react-router-dom'
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined"
import {PropsType} from "../Gallery/GalleryContainer"
import {Grow} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        background:
            'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
}))

type PhotoAlbumsExtrasPropsType = {
    id: string
    title: string
    description: string
    url: string
}

const PhotoAlbums: FC<PropsType & PhotoAlbumsExtrasPropsType> = (props) => {

    const classes = useStyles()
    const history = useHistory()

    const redirect = () => {
        const path = '/album/' + props.id
        history.push(path)
    }

    return (
        <Grid item xs={12} sm={6}>
            <Grow in={true} style={{transformOrigin: '0 0 0'}}
                  {...(true ? {timeout: 1000} : {})}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={
                            props.url ? props.url : katok}
                    />
                    <CardActions>
                        <Typography>
                            {props.description}
                        </Typography>
                        <Tooltip title="Открыть фотоальбом" placement={'top'} arrow>
                            <IconButton aria-label="Фотоальбом" onClick={redirect}>
                                <PhotoLibraryOutlinedIcon color="primary"/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grow>
        </Grid>

    )
}
export default PhotoAlbums



