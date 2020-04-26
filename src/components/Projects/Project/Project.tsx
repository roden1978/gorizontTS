import React, {FC} from 'react'
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'
import samosvalIcon from '../../../assets/icons/samosval.svg'
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import CardActions from "@material-ui/core/CardActions"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from "@material-ui/core/Collapse"
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined'
import RefreshIcon from '@material-ui/icons/Refresh'
import moment from "moment"
import 'moment/locale/ru'
import Tooltip from "@material-ui/core/Tooltip"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {renderCheckbox, renderDatePicker, renderSelectField, renderTextField} from "../../../common/renderFilds"
import {validate} from '../../../common/validate'
import Button from "@material-ui/core/Button"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import {PropsType} from "../../Projects/ProjectsContainer"
import {ProjectsType} from "../../../tstypes/projectsTypes"
import {PhotoType} from "../../../tstypes/photosTypes"
import {UseStateExpandedProps} from "../../../tstypes/commonTypes"
import Divider from "@material-ui/core/Divider";
import {Grow} from "@material-ui/core";


export const useStyles = makeStyles(theme => ({
    titleHidden: {
        background:
            'linear-gradient(to bottom, #ffbbbb, #ffffff 80%)',
    },
    pos: {
        marginLeft: 12,
        fontSize: 14,
        fontWeight: 'bold'
    },
    avatar: {
        backgroundColor: 'white',
        width: 35,
        height: 35
    },
    katok: {
        width: 30,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        minHeight: 140,
    },
    date: {
        marginLeft: 12
    },
    expand: {
        transform: 'rotate(0deg)',
        backgroundColor: '#f5f6f7',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    adminPanel: {
        border: '2px solid grey',
        backgroundColor: '#e9ecf4'
    },
    buttonSubmit: {
        marginLeft: 10,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'wrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    im: {
        width: '100%',
    },
}))


type ExpandOverType = {
    expandOver: () => void
}

type ProjectPropsType = PropsType & ProjectsType

type InitialDataType = typeof initialData

type ProjectPropsWithExpandedPropsType = ProjectPropsType & UseStateExpandedProps

const Project: FC<ProjectPropsType> = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        if (!props.id)
            setExpanded(!expanded)
        props.getId('')
    }

    let photos = props.photosWithUrl.filter((photo: PhotoType) => photo.albumId === props.albumId)
    photos.length = 4

    const expandOver = () => {
        setExpanded(true)
        props.getId('')
    }

    const viewAllProjectsClick = () => {
        setExpanded(false)
        props.getId('')
        props.setIsAllProjects(true)
        redirectToProjects()
    }

    let createAt = moment(props.createAt)
    createAt.locale('ru')

    const redirectToProjects = () => {
        props.setIsAllProjects(false)
        const path = '/projects'
        history.push(path)
    }

    if (props.albumIdForRedirect === props.albumId && props.currentProjectId === props._id) {
        props.setAlbumIdForRedirect('')
        //redirectToAlbum(props.albumIdForRedirect)
        const path = '/album/' + props.albumIdForRedirect
        history.push(path)
    }

    const checkAlbum = () => {
        props.checkAlbum(props.albumId)
        props.setCurrentProjectId(props._id)
    }

    return (
        <Grid item xs={10}>
            <Grow in={true} style={{ transformOrigin: '0 0 0' }}
                  {...(true ? { timeout: 1000 } : {})}>
            <Card className={classes.card}>
                <CardHeader title={!props.status && props.adminMode ? props.title + " (скрытый)" : props.title}
                            className={!props.status && props.adminMode ? classes.titleHidden : ''}
                            avatar={
                                <Avatar className={classes.avatar}>
                                    <img className={classes.katok} src={samosvalIcon} alt="Работа"/>
                                </Avatar>
                            }

                />
                <CardContent>
                    <Typography variant="body1" color="textPrimary" paragraph>
                        {props.description}
                    </Typography>

                </CardContent>
                <CardActions>
                    {props.albumId ? <>
                            <Typography variant="body2" color="textPrimary">
                                Фотоальбом
                            </Typography>
                            <Tooltip title="Открыть фотоальбом" placement={'top'} arrow>
                                <IconButton aria-label="Фотоальбом" onClick={checkAlbum}>
                                    <PhotoLibraryOutlinedIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                        </>
                        : ''}
                    <Typography variant="body2" color="textPrimary">
                        Показать больше
                    </Typography>
                    <Tooltip title={!expanded ? "Показать больше" : "Свернуть"} placement={'top'} arrow>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Показать больше"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={expanded || props.id ? true : false} timeout="auto" unmountOnExit>
                    <CardContent>
                        <>
                            {props.text.split('\n').map((i, key) => {
                                return <Typography key={key} paragraph variant="body1"
                                                   color="textPrimary">{i}</Typography>
                            })}
                        </>
                    </CardContent>
                    <div className={classes.root}>
                        <GridList className={classes.gridList} cols={4}>
                            {photos.map(photo => (
                                <GridListTile key={photo.title}>
                                    <img src={photo.url} alt={photo.title}/>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </Collapse>

                <Typography className={classes.date} variant="body2" color="textSecondary" gutterBottom>
                    <Divider/>
                    Старт проекта: {createAt.format('LL')}
                </Typography>
                {props.projects.length === 1 ? <>
                    <Tooltip title={"Показать все проекты"} placement={'top'} arrow>
                        <Button size="small" type="button"
                                onClick={viewAllProjectsClick}>
                            Показать все проекты
                        </Button>
                    </Tooltip>
                </> : null}
                {props.adminMode ? <AdminPanelProjects expandOver={expandOver} {...props}/> : ''}
            </Card>
            </Grow>
        </Grid>
    )
}
export default Project

const AdminPanelProjects: FC<ProjectPropsType & ExpandOverType> = (props) => {
    const classes = useStyles()
    const [expandedCreate, setExpandedCreate] = React.useState(false)
    const [expandedEdit, setExpandedEdit] = React.useState(false)
    const [expandedDelete, setExpandedDelete] = React.useState(false)

    const handleCreateExpandClick = () => {
        setExpandedCreate(!expandedCreate)
        if (!expandedCreate) {
            props.setLoadAlbums(true)
            props.getId(props._id)
            props.setProjectsItem(true)
            setInitialData(props, true)
        } else {
            props.expandOver()
            props.albums.length = 0
            props.setIsAllProjects(true)
        }
    }

    const handleEditExpandClick = () => {
        setExpandedEdit(!expandedEdit)
        if (!expandedEdit) {
            props.setLoadAlbums(true)
            props.getId(props._id)
            props.setProjectsItem(true)
            setInitialData(props, false, false)
        } else {
            props.expandOver()
            props.setIsAllProjects(true)
        }
    }

    const handleDeleteExpandClick = () => {
        setExpandedDelete(!expandedDelete)
        if (!expandedDelete) {
            props.getId(props._id)
            props.setProjectsItem(true)
            setInitialData(props, false, true)
        } else {
            props.expandOver()
            props.setIsAllProjects(true)
            props.setProjectsCount(0)
        }
    }

    const handleRefreshClick = () => {
        props.setIsAllProjects(true)
    }

    const showResults = (values: ProjectsType) => {
        const position = values.albumId.indexOf('|', 0)
        let id, title
        if (position > 0) {
            id = values.albumId.slice(0, position)
            title = values.albumId.slice(position + 1)
            values.albumId = id.trim()
            values.albumName = title.trim()
        }

        if (expandedEdit) {
            props.updateProject(values._id, values.title, values.description, values.text, values.albumId, values.albumName, values.status, values.createAt)
            handleEditExpandClick()
        }


        if (expandedCreate) {
            props.createProject(values.title, values.description, values.text, values.albumId, values.albumName, values.status, values.createAt)
            handleCreateExpandClick()
        }

        if (expandedDelete) {
            props.deleteProject(values._id)
            handleDeleteExpandClick()
        }
        //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }

    return (
        <>
            <CardActions>
                <Typography variant="body2" color="textPrimary">
                    Создать
                </Typography>
                <Tooltip title={!expandedCreate ? "Создать проект" : "Отмена"} placement={'top'} arrow>
                    <IconButton onClick={handleCreateExpandClick}
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expandedCreate,
                                })}
                                aria-expanded={expandedCreate}
                                aria-label="Показать больше"
                                disabled={expandedDelete || expandedEdit}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Tooltip>

                <Typography variant="body2" color="textPrimary">
                    Редактировать
                </Typography>
                <Tooltip title={!expandedEdit ? "Редактировать проект" : "Отмена"} placement={'top'} arrow>
                    <IconButton onClick={handleEditExpandClick}
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expandedEdit,
                                })}
                                aria-expanded={expandedEdit}
                                aria-label="Показать больше"
                                disabled={expandedCreate || expandedDelete || props._id === '0'}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Tooltip>

                <Typography variant="body2" color="textPrimary">
                    Удалить из БД
                </Typography>
                <Tooltip title={!expandedDelete ? "Удалить из БД" : "Отмена"} placement={'top'} arrow>
                    <IconButton onClick={handleDeleteExpandClick}
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expandedDelete,
                                })}
                                aria-expanded={expandedDelete}
                                aria-label="Показать больше"
                                disabled={expandedCreate || expandedEdit || props._id === '0'  || props.status}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title={"Обновить"} placement={'top'} arrow>
                    <Button className={classes.buttonSubmit} variant="outlined" size="small" type="button"
                            disabled={expandedCreate || expandedEdit || expandedDelete}
                            onClick={handleRefreshClick}
                            startIcon={<RefreshIcon/>}>
                        Обновить
                    </Button>
                </Tooltip>
            </CardActions>
            <Collapse in={expandedCreate || expandedEdit || expandedDelete} timeout="auto"
                      unmountOnExit>
                <CardContent className={classes.adminPanel}>
                    <Typography variant="h6" color="textPrimary" align="center">
                        ПАНЕЛЬ АДМИНИСТРИРОВАНИЯ
                    </Typography>
                    <EditProjectsReduxForm onSubmit={showResults}
                                           expandedCreate={expandedCreate}
                                           expandedEdit={expandedEdit}
                                           expandedDelete={expandedDelete}
                                           albums={props.albums}
                                           projectsCount={props.projectsCount}
                                           {...props}/>
                </CardContent>
            </Collapse>
        </>
    )
}

const setInitialData = (props: ProjectPropsType, reset: boolean, expandedDelete?: boolean) => {
    //debugger
    if (reset) {
        initialData._id = ''
        initialData.title = ''
        initialData.description = ''
        initialData.text = ''
        initialData.albumId = ''
        initialData.albumName = ''
        initialData.status = true
        initialData.createAt = ''
    } else {
        initialData._id = props._id
        initialData.title = props.title
        initialData.description = props.description
        initialData.text = props.text
        initialData.albumId = props.albumId
        initialData.albumName = props.albumName
        if (expandedDelete)
            initialData.status = false
        else
            initialData.status = props.status
        initialData.createAt = props.createAt
    }

}

const initialData = {
    _id: '',
    title: '',
    description: '',
    text: '',
    albumId: '',
    albumName: '',
    status: true,
    createAt: ''
}

///////////////////////////////////////////////////////

const EditProjectsForm: FC<InjectedFormProps<InitialDataType, ProjectPropsWithExpandedPropsType> & ProjectPropsWithExpandedPropsType> = (props) => {
    const classesStyle = useStyles()
    const {handleSubmit, reset, albums} = props
    //const {handleSubmit, reset, classes, albums} = props
    let {pristine, submitting} = props
    //debugger

    let albumsItem = albums.map(
        album => <option key={album.id} value={`${album.id} | ${album.description._content}`}
                         label={album.description._content}></option>)

    if (props.expandedEdit) {
        pristine = false
        submitting = false
    }

    let getLabel = () => {
        if (props.expandedEdit || props.expandedCreate) {
            return "Показывать на сайте"
        }
        if (props.expandedDelete) {
            return "Удалить из базы данных навсегда"
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {!props.expandedDelete ? <>
                    <div>
                        <Field
                            name="title"
                            component={renderTextField}
                            label="Заголовок"
                        />
                    </div>
                    <div>
                        <Field
                            name="description"
                            component={renderTextField}
                            label="Краткое описание"
                        />
                    </div>
                    < div>
                        < Field
                            name="text"
                            component={renderTextField}
                            label="Описание проекта"
                            multiline
                            rowsMax="10"
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Field
                            name="albumId"
                            component={renderSelectField}
                            label="Фотоальбом"

                        >
                            {props.expandedEdit ? <>
                                    <option value={props.albumId} label={props.albumName}/>
                                    <option value=''/>
                                </> :
                                <option value=''/>}
                            {albumsItem}
                        </Field>
                    </div>
                <div>
                    <Field
                        name = 'createAt'
                        component = {renderDatePicker}
                        label = 'Дата'
                        helperText="Дата старта проекта"
                        minDate={new Date("2019-01-01")}
                        maxDate={new Date("2050-01-01")}
                        >
                    </Field>
                </div>
                </>
                : null
            }
            <div>
                <Field name="status"
                       component={renderCheckbox}
                       label={getLabel()}
                       disabled={props.projectsCount === 1 || props.expandedCreate}/>
            </div>
            <div>
                <Button className={classesStyle.buttonSubmit} variant="contained" color="primary" type="submit"
                        disabled={pristine || submitting}>
                    Отправить
                </Button>
                <Button className={classesStyle.buttonSubmit} variant="contained" color="primary" type="button"
                        disabled={pristine || submitting} onClick={reset}>
                    Очистить поля
                </Button>
            </div>
        </form>
    )
}

const EditProjectsReduxForm = reduxForm<InitialDataType, ProjectPropsWithExpandedPropsType>({
    form: 'EditProjectsForm', // a unique identifier for this form
    validate,
    initialValues: initialData as InitialDataType
})(EditProjectsForm)


// classes={classes}