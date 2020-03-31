import React, {FC} from 'react'
import GridList from "@material-ui/core/GridList"
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ButtonBase from '@material-ui/core/ButtonBase'
import greyder from "../../assets/icons/greyder.svg"
import Avatar from "@material-ui/core/Avatar"
import ModalPhoto from "../../common/ModalPhoto"
import Container from "@material-ui/core/Container"
import {useStyles} from "./PhotoAlbumStyle";
import {PropsType} from "./PhotoAlbumContainer";

const PhotoAlbum:FC<PropsType> = (props) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>

            <Container maxWidth="md">
            <GridList cellHeight={400} className={classes.gridList} >
                {props.cards.map(card => (
                    <GridListTile key={card.url ? card.url : greyder} >
                        <ButtonBase   onClick={()=>{
                            props.changeClicked(true)
                            props.getUrl(card.url!)
                        }}>
                            <img className={classes.im} src={card.url ? card.url : greyder} alt={card.title}/>
                        </ButtonBase>
                        <GridListTileBar
                            title={card.title}
                            className={classes.titleBar}
                            actionIcon={
                                <Avatar className={classes.avatar}>
                                    <img className={classes.katok} src={greyder} alt={card.title}/>
                                </Avatar>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
            </Container>
            {props.isClicked ? <ModalPhoto {...props}/> : null}

        </div>
    )
}

export default PhotoAlbum
/*changeClicked = {props.changeClicked} url = {props.url}
*  sx = {5}*/