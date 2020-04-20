import React, {FC} from 'react'
import NewsItem from './NewsItem/NewsItem'
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import {Container} from "@material-ui/core"
import Pagination from '@material-ui/lab/Pagination'
import {PropsType} from './NewsContainer'
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    pos: {
        paddingBottom: 20,
        paddingTop: 20,
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(8)
    },
    containerCenter: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))

const News: FC<PropsType> = (props) => {
    const classes = useStyles()
    let newsItems
    if (props.news)
        newsItems = props.news.map(
            (newsItem) => <NewsItem key={newsItem._id}
                                    {...newsItem}
                                    {...props}/>)
    const currentPage = (event: any, page: number) => {
        props.setCurrentPage(page)
        props.setIsAllNews(true)
    }
    return (
        <div className={classes.root}>
            <Container className={classes.cardGrid} maxWidth={'xl'}>
                <Typography variant="h4" align="center">
                    НОВОСТИ
                </Typography>
                <div className={classes.containerCenter}>
                    {props.adminMode && props.news && props.newsCount !== 0 ?
                        <Pagination count={Math.ceil(props.newsCount / 10)}
                                    showFirstButton
                                    showLastButton
                                    page={props.currentPage}
                                    onChange={currentPage}/> : null}
                </div>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    spacing={3}
                    className={classes.pos}
                >

                    {newsItems}

                </Grid>
                <div className={classes.containerCenter}>
                    {props.adminMode && props.news && props.newsCount !== 0 ?
                        <Pagination count={Math.ceil(props.newsCount / 10)}
                                    showFirstButton
                                    showLastButton
                                    page={props.currentPage}
                                    onChange={currentPage}/> : null}
                </div>
            </Container>
        </div>
    )
}

export default News