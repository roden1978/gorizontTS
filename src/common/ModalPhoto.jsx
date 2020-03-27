import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import ButtonBase from "@material-ui/core/ButtonBase"

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid coral',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 1)
    },
    im: {
        width: '100%',
    },
}))

const ModalPhoto = (props) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)

    /*const handleOpen = () => {
        setOpen(true)
    }*/

    const handleClose = () => {
        setOpen(false)
        props.changeClicked(false)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 100,
                }}
            >
                <Fade in={open}>
                        <ButtonBase
                            className={classes.paper}
                            onClick={()=>{
                            handleClose()
                        }}>
                            <img className={classes.im} src={props.url} alt=''/>
                        </ButtonBase>
                </Fade>
            </Modal>
        </div>
    )
}

export default ModalPhoto