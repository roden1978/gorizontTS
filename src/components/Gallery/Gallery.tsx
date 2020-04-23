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
    },
    pos: {
        paddingBottom: 20,
        paddingTop: 20,
    },
}))

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
    if (sets.length !== 0)
        props.setIsShowSpinner(true)

    return (
        <div className={classes.root}>
            <Container className={classes.cardGrid} maxWidth="md">
                <Typography variant="h4" align="center">
                    ГАЛЕРЕЯ
                </Typography>
                <Grid container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                      spacing={3}
                      className={classes.pos}
                >
                    {/*{sets.length !== 0 ? sets : <Typography variant="h5" align="center">
                        Фотоальбомы находятся в разработке или что-то пошло не так, попробуйте зайти позже. Приносим
                        свои извининения.
                    </Typography>}*/}
                    {sets}
                </Grid>
            </Container>
        </div>
    )
}

export default Gallery

{/* <div className={classes.heroContent}>
                <Container maxWidth="sm">

                </Container>
            </div>*/
}