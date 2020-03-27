import React, {FC} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

const MenuAppBar:FC<{}> = () =>{
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)


    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

     return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        ООО Горизонт
                    </Typography>
                    <div>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}
                                  component={Link} to="/news">Новости</MenuItem>
                        <MenuItem onClick={handleClose}
                                  component={Link} to="/projects">Проекты</MenuItem>
                        <MenuItem onClick={handleClose}
                                  component={Link} to="/gallery">Галерея</MenuItem>
                        <MenuItem onClick={handleClose}
                                  component={Link} to="/job">Работа</MenuItem>
                        <MenuItem onClick={handleClose}
                                  component={Link} to="/contacts">Контакты</MenuItem>
                        <MenuItem onClick={handleClose}
                                  component={Link} to="/about">О компании</MenuItem>
                    </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MenuAppBar