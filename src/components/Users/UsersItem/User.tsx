import React, {FC} from 'react'
import Grid from "@material-ui/core/Grid"
import CardHeader from "@material-ui/core/CardHeader"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import katokIcon from '../../../assets/icons/katok.svg'
import clsx from "clsx"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import RefreshIcon from '@material-ui/icons/Refresh'
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import {renderTextField, renderCheckbox} from '../../../common/renderFilds'
import {validate} from '../../../common/validate'
import {useStyles} from "./UserStyles";
import {PropsType} from "../UsersContainer";
import {UsersType} from "../../../tstypes/usersTypes";
import {UseStateExpandedProps} from "../../../tstypes/commonTypes";

type UsersPropsType = PropsType & UsersType
type InitialDataType = typeof initialData
type UsersWithExpandedPropsType = UsersPropsType & UseStateExpandedProps

const User:FC<UsersPropsType> = (props) => {
    const classes = useStyles()

    return (
        <Grid item xs={10}>
            <Card className={classes.card}>
                <CardHeader title={`${props.firstName} ${props.lastName}`}
                            avatar={
                                <Avatar className={classes.avatar}>
                                    <img className={classes.katok} src={katokIcon} alt="Пользователь"/>
                                </Avatar>
                            }
                />
                <CardContent>
                    <Typography className={classes.pos} variant="body2" color="textPrimary">
                        Логин: {props.email}
                    </Typography>
                    <Typography className={classes.pos} variant="body2" color="textPrimary">
                        Пароль: {props.password}
                    </Typography>
                    <Typography className={classes.pos} variant="body2" color="textPrimary">
                        Права на создание пользователей: {props.root === true ? "Да" : "Нет"}
                    </Typography>
                </CardContent>
                {props.adminMode ? <AdminPanelUsers {...props}/> : ''}
            </Card>
        </Grid>
    )
}

export default User

const AdminPanelUsers:FC<UsersPropsType> = (props) => {

    const classes = useStyles()
    const [expandedCreate, setExpandedCreate] = React.useState(false)
    const [expandedEdit, setExpandedEdit] = React.useState(false)
    const [expandedDelete, setExpandedDelete] = React.useState(false)

    const handleCreateExpandClick = () => {
        setExpandedCreate(!expandedCreate)

        if (!expandedCreate) {
            props.setCurrentUsersId(props._id)
            props.setUserItem(true)
            setInitialData(props, true, false)
        } else {
            props.setIsAllUsers(true)
        }
    }

    const handleEditExpandClick = () => {
        props.setIsAdminRootCount(true)
        setExpandedEdit(!expandedEdit)
        if (!expandedEdit) {
            props.setCurrentUsersId(props._id)
            props.setUserItem(true)
            setInitialData(props, false, false)
        } else {
            props.setIsAllUsers(true)
            props.setIsAdminRootCount(false)
            props.setAdminRootCount(0)
        }
    }

    const handleDeleteExpandClick = () => {
        props.setUsersCount(props.users.length)
        props.setIsAdminRootCount(true)
        setExpandedDelete(!expandedDelete)
        if (!expandedDelete) {
            props.setCurrentUsersId(props._id)
            props.setUserItem(true)
            setInitialData(props, false, true)
        } else {
            props.setIsAllUsers(true)
            props.setUsersCount(0)
            props.setIsAdminRootCount(false)
            props.setAdminRootCount(0)
        }
    }

    const handleRefreshClick = () => {
        props.setIsAllUsers(true)
    }

    const showResults = (values: UsersType) => {
        //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)

        if (expandedEdit) {
            props.updateUser(values._id, values.firstName, values.lastName, values.email, values.password, values.root)
            handleEditExpandClick()
        }


        if (expandedCreate) {
            props.createUser(values.firstName, values.lastName, values.email, values.password, values.root)
            handleCreateExpandClick()
        }

        if (expandedDelete) {
            props.deleteUser(values._id)
            handleDeleteExpandClick()
        }
    }

    return (
        <>
            <CardActions>
                <Typography variant="body2" color="textPrimary">
                    Создать
                </Typography>
                <Tooltip title={!expandedCreate ? "Создать пользователя" : "Отмена"} placement={'top'} arrow>
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
                <Tooltip title={!expandedEdit ? "Редактировать пользователя" : "Отмена"} placement={'top'} arrow>
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
                    <EditUsersReduxForm onSubmit={showResults}
                                        expandedCreate={expandedCreate}
                                        expandedEdit={expandedEdit}
                                        expandedDelete={expandedDelete}
                                        {...props}/>
                </CardContent>
            </Collapse>
        </>
    )
}

const setInitialData = (props: UsersPropsType, reset: boolean, expandedDelete: boolean) => {
    if (reset) {
        initialData._id = ''
        initialData.firstName = ''
        initialData.lastName = ''
        initialData.email = ''
        initialData.password = ''
        initialData.root = false
    } else {
        initialData._id = props._id
        initialData.firstName = props.firstName
        initialData.lastName = props.lastName
        initialData.email = props.email
        initialData.password = ''
        if (expandedDelete)
            initialData.root = false
        else
            initialData.root = props.root
    }

}

const initialData = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    root: false,
}
///////////////////////////////////////////////////////

const EditUsersForm: FC<InjectedFormProps<InitialDataType, UsersWithExpandedPropsType> & UsersWithExpandedPropsType> = (props) => {
    const classesStyle = useStyles()
    const {handleSubmit, reset} = props
    let {pristine, submitting} = props

    if (props.expandedEdit) {
        pristine = false
        submitting = false
    }

    let getLabel = () => {
        if (props.expandedEdit || props.expandedCreate) {
            return "Права на создание и изменение пользователей"
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
                            name="firstName"
                            component={renderTextField}
                            label="Имя"
                        />
                    </div>
                    < div>
                        < Field
                            name="lastName"
                            component={renderTextField}
                            label="Фамилия"
                        />
                    </div>
                    < div>
                        < Field
                            name="email"
                            component={renderTextField}
                            label="Адрес электронной почты"
                        />
                    </div>
                    < div>
                        < Field
                            name="password"
                            component={renderTextField}
                            label="Пароль"
                            type="password"
                        />
                    </div>
                    < div>
                        < Field
                            name="confPassword"
                            component={renderTextField}
                            type="password"
                            label="Подтвердить пароль"
                        />
                    </div>
                </>
                : null
            }
            <div>
                <Field name="root"
                       component={renderCheckbox}
                       label={getLabel()}
                       disabled={(props.adminRootCount === 1 && props.root && props.expandedEdit)
                       || (props.expandedDelete && props.root && props.adminRootCount === 1)}/>
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

const EditUsersReduxForm = reduxForm<InitialDataType, UsersWithExpandedPropsType>({
    form: 'EditUsersForm', // a unique identifier for this form
    validate,
    initialValues: initialData as InitialDataType
})(EditUsersForm)