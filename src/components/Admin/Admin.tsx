import React, {FC} from "react"
import {useStyles} from "./AdminStyles"
import {checkUser, setIsUsers} from "../../redux/actions/authActions"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import Button from "@material-ui/core/Button"
import CardContent from "@material-ui/core/CardContent"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {renderCheckbox, renderTextField} from "../../common/renderFilds"
import {validate} from "../../common/validate"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Grid from "@material-ui/core/Grid"
import {Container} from "@material-ui/core"
import {AppStateType} from "../../redux/store"

type MapStateToPropsType = {
    auth: boolean
    adminMode: boolean
    adminRoot: boolean
    isUsers: boolean
}

type MapDispatchToPropsType= {
    checkUser:(email: string, password: string, newUsers: boolean) => void
    setIsUsers: (isUsers: boolean) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType
type InitialDataType = typeof initialData

class Admin extends React.Component<PropsType> {

    componentDidMount() {
    }

    render() {
        //debugger
        return (<>
            {this.props.adminMode ? this.props.adminRoot && this.props.isUsers ? <Redirect to='/admin/users'/> :
                <Redirect to='/news'/> :
                <Login {...this.props}/>}
        </>)
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        auth: state.auth.isAuthorized,
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot,
        isUsers: state.auth.isUsers
    }

}
//checkUser={this.props.checkUser} setIsUsers={this.props.setIsUsers}

export default connect(mapStateToProps, {checkUser, setIsUsers})(Admin)

export const Login:FC<PropsType> = (props) => {
    //debugger
    const classes = useStyles()
    const showResults = (values: InitialDataType) => {

        //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        if (values.newUsers)
            props.setIsUsers(true)

        props.checkUser(values.email, values.password, values.newUsers)

    }

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
                    <Grid item xs={6}>
                        <Card className={classes.card}>
                            <CardHeader title='ЛОГИН'/>
                            <CardContent>
                                <LoginReduxForm onSubmit={showResults} {...props}/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}

const initialData = {
    email: '',
    password: '',
    newUsers: false
}
///////////////////////////////////////////////////////

const LoginForm: FC<InjectedFormProps<InitialDataType, PropsType> & PropsType > = (props) => {
    const classesStyle = useStyles()
    const {handleSubmit, reset} = props
    let {pristine, submitting} = props
    //debugger
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <Field
                    name="email"
                    component={renderTextField}
                    label="Адрес электронной почты"
                />
            </div>
            < div>
                < Field
                    name="password"
                    type="password"
                    component={renderTextField}
                    label="Пароль"
                />
            </div>
            <div>
                <Field name="newUsers"
                       component={renderCheckbox}
                       label='Администрирование пользователей'/>
            </div>
            <div>
                <Button className={classesStyle.buttonSubmit} variant="contained" color="primary" type="submit"
                        disabled={pristine || submitting}>
                    Вход
                </Button>
                <Button className={classesStyle.buttonSubmit} variant="contained" color="primary" type="button"
                        disabled={pristine || submitting} onClick={reset}>
                    Очистить поля
                </Button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<InitialDataType, PropsType>({
    form: 'LoginForm', // a unique identifier for this form
    validate,
    initialValues: initialData as InitialDataType
})(LoginForm)