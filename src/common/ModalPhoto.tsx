import React, {FC} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import ButtonBase from "@material-ui/core/ButtonBase"
import {PropsType} from "../components/PhotoAlbum/PhotoAlbumContainer";

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
        padding: theme.spacing(1, 1, 1),
        display: 'block',
    },
    im: {
        width: '100%',
    },
}))

const ModalPhoto: FC<PropsType> = (props) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    const [activeStep, setActiveStep] = React.useState(props.currentPhotoIndex);
    const maxSteps = props.cards.length;

    const handleClose = () => {
        setOpen(false)
        props.changeClicked(false)
    }

    const handlePhotoChange = () => {
        if (activeStep === maxSteps - 1) {
            setActiveStep(0);
            props.setCurrentPhotoIndex(0)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            props.setCurrentPhotoIndex(activeStep + 1)
        }

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
                        onClick={() => {
                            handlePhotoChange()
                        }}
                    >
                        <img className={classes.im} src={props.cards[props.currentPhotoIndex].url} alt=''/>
                    </ButtonBase>
                </Fade>
            </Modal>
        </div>
    )
}

export default ModalPhoto

