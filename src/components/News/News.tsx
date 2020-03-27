import React, {FC} from 'react'
import NewsItem from './NewsItem/NewsItem'
import {makeStyles} from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import {Container} from "@material-ui/core"
import { PropsType } from './NewsContainer'

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
        paddingBottom: theme.spacing(8),
    },
}))

const News:FC<PropsType> = (props) => {
    //debugger
    const classes = useStyles()
    let newsItems
    if (props.news)
        newsItems = props.news.map(
            (newsItem) => <NewsItem key={newsItem._id}
                                  {...newsItem}
                                  {...props}/>)

    return (
        <div className={classes.root}>
            <Container className={classes.cardGrid} maxWidth="xl">
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
            </Container>
        </div>
    )
}

export default News

/*
                                  projects={props.projects}
                                  setLoadProjects={props.setLoadProjects}
                                  setNewsItem={props.setNewsItem}
                                  setIsAllNews={props.setIsAllNews}
                                  setCurrentNewsId={props.setCurrentNewsId}
                                  createNews={props.createNews}
                                  updateNews={props.updateNews}
                                  deleteNews={props.deleteNews}
                                  setNewsCount={props.setNewsCount}
                                  newsCount={props.newsCount}*/