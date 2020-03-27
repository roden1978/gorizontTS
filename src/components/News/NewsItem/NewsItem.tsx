import React, {FC, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useStyles} from './NewsStyles'
import Grid from "@material-ui/core/Grid"
import CardHeader from "@material-ui/core/CardHeader"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import moment from "moment"
import 'moment/locale/ru'
import katokIcon from '../../../assets/icons/katok.svg'
import clsx from "clsx"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import RefreshIcon from '@material-ui/icons/Refresh'
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import {Field, reduxForm, InjectedFormProps} from "redux-form"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import {renderTextField, renderCheckbox, renderSelectField} from '../../../common/renderFilds'
import {validate} from '../../../common/validate'
import FolderIcon from '@material-ui/icons/Folder'
import {ProjectsType} from "../../../tstypes/projectsTypes"
import {PropsType} from '../NewsContainer'
import {NewsType} from "../../../tstypes/newsTypes"
import {UseStateExpandedProps} from "../../../tstypes/commonTypes"



type NewsItemPropsType = PropsType & NewsType

type InitialDataType = typeof initialData

type NewsItemWithExpandedPropsType = NewsItemPropsType & UseStateExpandedProps

const NewsItem: FC<NewsItemPropsType> = (props) => {
    const classes = useStyles()
    const history = useHistory()

    let createAt = moment(props.createAt)

    if (props.projectIdForRedirect === props.project && props.currentNewsId === props._id) {
        props.setProjectIdForRedirect('')
        const path = '/projects/' + props.projectIdForRedirect
        history.push(path)
    }

    const checkPrj = () => {
        props.checkProject(props.project)
        props.setCurrentNewsId(props._id)
    }

    createAt.locale('ru')

    return (
        <Grid item xs={10}>
            <Card className={classes.card}>
                <CardHeader title={!props.status && props.adminMode ? props.title + " (срытый)" : props.title}
                            className={clsx(classes.title, {
                                [classes.titleHidden]: !props.status && props.adminMode,
                            })}
                            avatar={
                                <Avatar className={classes.avatar}>
                                    <img className={classes.katok} src={katokIcon} alt="Новости"/>
                                </Avatar>
                            }
                />
                <CardContent>
                    <>
                        {props.text.split('\n').map((i, key) => {
                            return <Typography key={key} paragraph variant="body1" color="textPrimary"
                                               gutterBottom>{i}</Typography>
                        })}
                    </>
                </CardContent>
                <CardActions>
                    {props.project ? <>
                            <Typography variant="body2" color="textPrimary">
                                Обзор проекта
                            </Typography>
                            <Tooltip title="Открыть проект" placement={'top'} arrow>
                                <IconButton aria-label="Проект" onClick={checkPrj}>
                                    <FolderIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                            <Typography className={classes.pos} variant="body2" color="textPrimary">
                                {props.projectTitle}
                            </Typography>
                        </> :
                        null}
                </CardActions>
                <Typography className={classes.pos} variant="body2" color="textSecondary" gutterBottom>
                    {createAt.format('LL')}
                </Typography>
                {props.adminMode ? <AdminPanelNews {...props}/> : ''}
            </Card>
        </Grid>
    )
}

export default NewsItem

const AdminPanelNews: FC<NewsItemPropsType> = (props) => {

    const classes = useStyles()
    const [expandedCreate, setExpandedCreate] = useState(false)
    const [expandedEdit, setExpandedEdit] = useState(false)
    const [expandedDelete, setExpandedDelete] = useState<boolean>(false)

    const handleCreateExpandClick = () => {

        setExpandedCreate(!expandedCreate)
        if (!expandedCreate) {
            props.setLoadProjects(true)
            props.setCurrentNewsId(props._id)
            props.setNewsItem(true)
            setInitialData(props, true, expandedDelete)
        } else {
            props.projects.length = 0
            props.setIsAllNews(true)
        }
    }

    const handleEditExpandClick = () => {
        setExpandedEdit(!expandedEdit)
        if (!expandedEdit) {
            props.setLoadProjects(true)
            props.setCurrentNewsId(props._id)
            props.setNewsItem(true)
            setInitialData(props, false, false)
        } else {
            props.setIsAllNews(true)

        }
    }

    const handleDeleteExpandClick = () => {
        //debugger
        props.setNewsCount(props.news.length)
        setExpandedDelete(!expandedDelete)
        if (!expandedDelete) {
            props.setCurrentNewsId(props._id)
            props.setNewsItem(true)
            setInitialData(props, false, true)
        } else {
            props.setIsAllNews(true)
            props.setNewsCount(0)
        }
    }

    const handleRefreshClick = () => {
        props.setIsAllNews(true)
    }

    const showResults = (values: NewsType) => {
        if (values.project) {
            const position = values.project.indexOf('|', 0)
            let id, title
            if (position > 0) {
                id = values.project.slice(0, position)
                title = values.project.slice(position + 1)
                values.project = id
                values.projectTitle = title.trim()
            }
        } else {
            values.project = ''
            values.projectTitle = ''
        }

        if (expandedEdit) {
            props.updateNews(values._id, values.title, values.text, values.project, values.projectTitle, values.status, values.createAt)
            handleEditExpandClick()
        }


        if (expandedCreate) {
            props.createNews(values.title, values.text, values.project, values.projectTitle, values.status)
            handleCreateExpandClick()
        }

        if (expandedDelete) {
            props.deleteNews(values._id)
            handleDeleteExpandClick()
        }
    }

    return (
        <>
            <CardActions>
                <Typography variant="body2" color="textPrimary">
                    Создать
                </Typography>
                <Tooltip title={!expandedCreate ? "Создать новость" : "Отмена"} placement={'top'} arrow>
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
                <Tooltip title={!expandedEdit ? "Редактировать новость" : "Отмена"} placement={'top'} arrow>
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
                                disabled={expandedCreate || expandedEdit || props._id === '0'}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Обновить"} placement={'top'} arrow>
                    <Button className={classes.buttonSubmit} variant="outlined" size="small" type="button"
                            disabled={expandedCreate || expandedEdit || expandedDelete || props._id === '0'}
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
                    <EditNewsReduxForm onSubmit={showResults}
                                       expandedCreate={expandedCreate}
                                       expandedEdit={expandedEdit}
                                       expandedDelete={expandedDelete}
                                       {...props}/>
                </CardContent>
            </Collapse>
        </>
    )
}

const setInitialData = (props: NewsItemPropsType, reset: boolean, expandedDelete: boolean) => {
    //debugger
    if (reset) {
        initialData._id = ''
        initialData.title = ''
        initialData.text = ''
        initialData.project = ''
        initialData.status = true
        initialData.projectTitle = ''
        initialData.createAt = ''
    } else {
        initialData._id = props._id
        initialData.title = props.title
        initialData.text = props.text
        initialData.project = props.project
        if (expandedDelete)
            initialData.status = false
        else
            initialData.status = props.status
        initialData.projectTitle = props.projectTitle
        initialData.createAt = props.createAt
    }

}

const initialData = {
    _id: '',
    title: '',
    text: '',
    project: '',
    projectTitle: '',
    status: true,
    createAt: ''
}

const EditNewsForm: FC<InjectedFormProps<InitialDataType, NewsItemWithExpandedPropsType> & NewsItemWithExpandedPropsType> = (props) => {
    const classes = useStyles()
    const {handleSubmit, reset, projects} = props
    //const {handleSubmit, reset, cls, projects} = props
    let {pristine, submitting} = props

    let projectsItems = projects.map(
        (projectItem: ProjectsType) => <option key={projectItem._id} value={`${projectItem._id}| ${projectItem.title}`}
                                               label={projectItem.title}></option>)

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
                    < div>
                        < Field
                            name="text"
                            component={renderTextField}
                            label="Текст новости"

                            multiline
                            rowsMax="4"
                            margin="normal"
                        />
                    </div>
                    <div>
                        <Field
                            name="project"
                            component={renderSelectField}
                            label="Проект"
                        >
                            {props.expandedEdit ? <>
                                    <option value={props.project} label={props.projectTitle}/>
                                    <option value=''/>
                                </> :
                                <option value='null'/>}
                            {projectsItems}
                        </Field>
                    </div>
                </>
                : null
            }
            <div>
                <Field name="status"
                       component={renderCheckbox}
                       label={getLabel()}
                       disabled={props.newsCount === 1 || props.expandedCreate}/>
            </div>
            <div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit"
                        disabled={pristine || submitting}>
                    Отправить
                </Button>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="button"
                        disabled={pristine || submitting} onClick={reset}>
                    Очистить поля
                </Button>
            </div>
        </form>
    )
}
//classes={cls}
const EditNewsReduxForm = reduxForm<InitialDataType, NewsItemWithExpandedPropsType>({
    form: 'EditNewsForm', // a unique identifier for this form
    validate,
    initialValues: initialData as InitialDataType
})(EditNewsForm)