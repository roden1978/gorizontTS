import React, {FC} from 'react'
import PhotoAlbums from "../PhotoAlbums/PhotoAlbums"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {PropsType} from "./GalleryContainer"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    heroContent: {

        padding: theme.spacing(0, 3, 0),
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8),
    }
}))



//export type PropsWithExtrasType = PropsType & PhotoAlbumsExtrasPropsType

const Gallery: FC<PropsType> = (props) => {
    const classes = useStyles()
    //debugger

    let sets = props.setsWithUrl.map(
        photoset => <PhotoAlbums key={photoset.id}
                                 id={photoset.id}
                                 title={photoset.title._content}
                                 description={photoset.description._content}
                                 url={photoset.primary}
                                 {...props}/>
    )

    return (
        <div className={classes.root}>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography variant="h5" align="center" color="textPrimary" paragraph>
                        Фотоальбомы ООО Горизонт
                    </Typography>
                </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                      spacing={10}>
                    {sets}
                </Grid>
            </Container>
        </div>
    )

}

export default Gallery
/*id={photoset.id}
                                 title={photoset.title._content}
                                 description={photoset.description._content}
                                 url={photoset.primary}*/