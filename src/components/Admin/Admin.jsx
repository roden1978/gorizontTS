import React from "react";
import {useStyles} from "./AdminStyles";
import {checkUser, setIsUsers} from "../../redux/actions/authActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import {Field, reduxForm} from "redux-form";
import {renderCheckbox, renderTextField} from "../../common/renderFilds";
import {validate} from "../../common/validate";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";

class Admin extends React.Component {

    componentDidMount() {
    }

    render() {
        //debugger
        return (<>
            {this.props.adminMode ? this.props.adminRoot && this.props.isUsers ? <Redirect to='/admin/users'/> :
                <Redirect to='/news'/> :
                <Login checkUser={this.props.checkUser} setIsUsers={this.props.setIsUsers}/>}
        </>)
    }
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth.isAuthorized,
        adminMode: state.auth.adminMode,
        adminRoot: state.auth.adminRoot,
        isUsers: state.auth.isUsers
    }

}

export default connect(mapStateToProps, {checkUser, setIsUsers})(Admin)

export const Login = (props) => {
    //debugger
    const classes = useStyles();
    const showResults = (values) => {

        //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
        if (values.newUsers)
            props.setIsUsers(true);

        props.checkUser(values.email, values.password, values.newUsers);

    };

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
                            <CardHeader title='Логин' className={classes.title}/>
                            <CardContent>
                                <LoginReduxForm onSubmit={showResults}/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}

const initialData = {
    emailLogin: '',
    password: '',
    newUsers: false
}
///////////////////////////////////////////////////////

const LoginForm = (props) => {
    const classesStyle = useStyles();
    const {handleSubmit, reset} = props;
    let {pristine, submitting} = props;
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

const LoginReduxForm = reduxForm({
    form: 'LoginForm', // a unique identifier for this form
    validate,
    initialValues: initialData
})(LoginForm)