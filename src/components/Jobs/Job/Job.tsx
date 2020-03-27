import React, {FC} from 'react'
import {useStyles} from './JobsStyles'
import Grid from "@material-ui/core/Grid"
import CardHeader from "@material-ui/core/CardHeader"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import 'moment/locale/ru'
import man01 from '../../../assets/icons/man.svg'
import man02 from '../../../assets/icons/man01.svg'
import man03 from '../../../assets/icons/man02.svg'
import man04 from '../../../assets/icons/man03.svg'
import man05 from '../../../assets/icons/man04.svg'
import man06 from '../../../assets/icons/man05.svg'
import moment from "moment"
import CardActions from "@material-ui/core/CardActions"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import clsx from "clsx"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Collapse from "@material-ui/core/Collapse"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {renderCheckbox, renderTextField} from "../../../common/renderFilds"
import Button from "@material-ui/core/Button"
import {validate} from "../../../common/validate"
import RefreshIcon from "@material-ui/icons/Refresh"
import {PropsType} from "../JobsContainer"
import {JobType} from "../../../tstypes/jobsTypes"
import {UseStateExpandedProps} from "../../../tstypes/commonTypes"

type JobsPropsType = PropsType & JobType
type JobsWithActivatePropsType = PropsType & JobType & ActivateType
type JobsPropsWithExpandedPropsType = JobsPropsType & UseStateExpandedProps
type InitialDataType = typeof initialData
type ActivateType = {
    activate: boolean
}

const Job:FC<JobsPropsType> = (props) => {

    const classes = useStyles()

    const currentDate: Date = new Date()
    const pubDate: Date = new Date(props.createAt)

    const days = 30 - Math.floor((currentDate.getMilliseconds() - pubDate.getMilliseconds()) /
        (24 * 60 * 60 * 1000)) - 1

    let createAt = moment(props.createAt)

    createAt.locale('ru')

    let titleIcon

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    switch (getRandomInt(7)) {
        case 0: {
            titleIcon = man01
            break
        }
        case 1: {
            titleIcon = man02
            break
        }
        case 2: {
            titleIcon = man03
            break
        }
        case 3: {
            titleIcon = man04
            break
        }
        case 4: {
            titleIcon = man05
            break
        }
        case 5: {
            titleIcon = man06
            break
        }
        default:
            titleIcon = man01
            break
    }

    let xs: any = 8 //Избавиться от any
    let sm: any = 4 //

    if (props.adminMode) {
        xs = 12
        sm = 12
    }
    //debugger

    return (
        <Grid item xs={xs} sm={sm}>
            <Card className={classes.card}>
                <CardHeader title={!props.status && props.adminMode ? props.title + " (срытый)" :props.title}
                            className={clsx(classes.title, {
                                [classes.titleHidden]: !props.status && props.adminMode,
                            })}
                            subheader={
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    {props.company}
                                </Typography>}
                            avatar={
                                <Avatar className={classes.avatar}>
                                    <img className={classes.katok} src={titleIcon} alt="Работа"/>
                                </Avatar>
                            }

                />
                <CardContent>
                    <>
                        {props.description.split('\n').map((i, key) => {
                            return <Typography key={key} paragraph variant="body1" color="textPrimary"
                                               gutterBottom>{i}</Typography>
                        })}
                    </>
                    <Typography className={classes.pos} variant="body2" color="textPrimary">
                        З/п: {props.price} руб.
                    </Typography>
                    <Typography className={classes.pos} variant="body2" color="textPrimary">
                        Электронная почта: {props.email}
                    </Typography>
                    <Typography className={classes.pos} variant="body2" color="textPrimary">
                        Телефон: {props.phone}
                    </Typography>
                </CardContent>
                <Typography className={classes.date} variant="body2" color="textSecondary">
                    {createAt.format('LL')}
                </Typography>
                <Typography className={classes.date} variant="body2" color="textSecondary">
                    Дней осталось: {days}
                </Typography>
                {props.adminMode ? <AdminPanelJobs activate={false} {...props}/> : ''}
            </Card>
        </Grid>
    )
}

export default Job

const AdminPanelJobs: FC<JobsWithActivatePropsType> = (props) => {
    //debugger
    const classes = useStyles()
    const [expandedCreate, setExpandedCreate] = React.useState(false)
    const [expandedEdit, setExpandedEdit] = React.useState(false)
    const [expandedDelete, setExpandedDelete] = React.useState(false)

    const handleCreateExpandClick = () => {

        setExpandedCreate(!expandedCreate)
        if (!expandedCreate) {
            props.setCurrentJobsId(props._id)
            props.setJobsItem(true)
            setInitialData(props, true)
        } else {
            props.setIsAllJobs(true)
        }

    }

    const handleEditExpandClick = () => {

        setExpandedEdit(!expandedEdit)
        if (!expandedEdit) {
            props.setCurrentJobsId(props._id)
            props.setJobsItem(true)
            setInitialData(props, false, false)
        } else {
            props.setIsAllJobs(true)

        }

    }

    const handleDeleteExpandClick = () => {
        //debugger
        props.setJobsCount(props.jobs.length)
        setExpandedDelete(!expandedDelete)
        if (!expandedDelete) {
            props.setCurrentJobsId(props._id)
            props.setJobsItem(true)
            setInitialData(props, false, true)
        } else {
            props.setIsAllJobs(true)
            props.setJobsCount(0)
        }
    }

    const handleRefreshClick = () => {
        props.setIsAllJobs(true)
    }

    const showResults = (values: InitialDataType) => {

        if (values.activate) {
            values.createAt = new Date().toISOString()
        }
        if (expandedEdit) {
            props.updateJob(values._id, values.company, values.title, values.description,
                values.price, values.email, values.phone, values.status, values.createAt)
            handleEditExpandClick()
        }

        if (expandedCreate) {
            props.createJob(values.company, values.title, values.description,
                values.price, values.email, values.phone, values.status)
            handleCreateExpandClick()
        }

        if (expandedDelete) {
            props.deleteJob(values._id)
            handleDeleteExpandClick()
        }

    }

    return (
        <>
            <CardActions>
                <Typography variant="body2" color="textPrimary">
                    Создать
                </Typography>
                <Tooltip title={!expandedCreate ? "Создать объявление" : "Отмена"} placement={'top'} arrow>
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
                <Tooltip title={!expandedEdit ? "Редактировать объявление" : "Отмена"} placement={'top'} arrow>
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
                    Удалить
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
                    <Button className={classes.buttonSubmit} variant="outlined" size="small"  type="button"
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
                    <EditJobsReduxForm onSubmit={showResults}
                                       expandedCreate={expandedCreate}
                                       expandedEdit={expandedEdit}
                                       expandedDelete={expandedDelete}
                                       jobsCount={props.jobsCount}
                                       {...props}/>
                </CardContent>
            </Collapse>
        </>
    )
}

const setInitialData = (props: InitialDataType, reset: boolean, expandedDelete?: boolean) => {
    //debugger
    if (reset) {
        initialData._id = ''
        initialData.company = ''
        initialData.title = ''
        initialData.description = ''
        initialData.price = ''
        initialData.email = ''
        initialData.phone = ''
        initialData.status = true
        initialData.createAt = ''
        initialData.activate = false
    } else {
        initialData._id = props._id
        initialData.company = props.company
        initialData.title = props.title
        initialData.description = props.description
        initialData.price = props.price
        initialData.email = props.email
        initialData.phone = props.phone
        if (expandedDelete)
            initialData.status = false
        else
            initialData.status = props.status
        initialData.createAt = props.createAt
        initialData.activate = false
    }

}

const initialData = {
    _id: '',
    company: '',
    title: '',
    description: '',
    price: '',
    email: '',
    phone: '',
    status: true,
    createAt: '',
    activate: false
}

///////////////////////////////////////////////////////

const EditJobsForm: FC<InjectedFormProps<InitialDataType, JobsPropsWithExpandedPropsType> & JobsPropsWithExpandedPropsType> = (props) => {
    const classesStyle = useStyles()
    const {handleSubmit, reset} = props
    let {pristine, submitting} = props
    //debugger

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
                            name="company"
                            component={renderTextField}
                            label="Работодатель"
                        />
                    </div>
                    <div>
                        <Field
                            name="title"
                            component={renderTextField}
                            label="Заголовок"
                        />
                    </div>
                    < div>
                        < Field
                            name="description"
                            component={renderTextField}
                            label="Текст объявления"
                            multiline
                            rowsMax="4"
                            margin="normal"
                        />
                    </div>
                    < div>
                        < Field
                            name="price"
                            component={renderTextField}
                            label="Зарплата"
                        />
                    </div>
                    < div>
                        < Field
                            name="email"
                            component={renderTextField}
                            label="Электронная почта"
                        />
                    </div>
                    < div>
                        < Field
                            name="phone"
                            component={renderTextField}
                            label="Телефон"
                        />
                    </div>
                </>
                : null
            }
            <div>
                <Field name="status"
                       component={renderCheckbox}
                       label={getLabel()}
                       disabled={props.jobsCount === 1 || props.expandedCreate}/>
            </div>
            {!props.expandedDelete ? <>
                    <div>
                        <Field name="activate"
                               component={renderCheckbox}
                               label="Активировать с текущей даты"
                               disabled={props.jobsCount === 1 || props.expandedCreate}/>
                    </div>
                </>
                : null
            }
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
const EditJobsReduxForm = reduxForm<InitialDataType, JobsPropsWithExpandedPropsType>({
    form: 'EditJobsForm', // a unique identifier for this form
    validate,
    initialValues: initialData as InitialDataType
})(EditJobsForm)
