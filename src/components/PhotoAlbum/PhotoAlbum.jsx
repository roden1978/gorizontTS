import React from 'react'
import GridList from "@material-ui/core/GridList";
import {makeStyles} from "@material-ui/core";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import greyder from "../../assets/icons/greyder.svg";
import Avatar from "@material-ui/core/Avatar";
import ModalPhoto from "../../common/ModalPhoto";
import Container from "@material-ui/core/Container";

const PhotoAlbum = (props) => {

    const useStyles = makeStyles(theme => ({
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
    }));

    const classes = useStyles();

//debugger
    return (
        <div className={classes.root}>

            <Container maxWidth="md" sx = {5}>
            <GridList cellHeight={400} className={classes.gridList} >
                {props.cards.map(card => (
                    <GridListTile key={card.url ? card.url : greyder} >
                        <ButtonBase   onClick={()=>{
                            props.changeClicked(true);
                            props.getUrl(card.url);
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
            {props.isClicked ? <ModalPhoto changeClicked = {props.changeClicked} url = {props.url}/> : null}

        </div>
    );
}

export default PhotoAlbum;
