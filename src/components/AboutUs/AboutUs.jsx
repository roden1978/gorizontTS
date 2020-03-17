import React from 'react'
import {useStyles} from './AboutUsStyles';
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../../common/renderFilds";
import {validate} from '../../common/validate'
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";

const AboutUs = (props) => {
    const classes = useStyles();
    //const info = props.contacts[0];
//debugger
    return (
        <div>
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
                        <Grid item xs={10}>
                            <Card>
                                <CardHeader title={'О нас'}
                                            className={classes.title}/>
                                <CardContent>
                                    <Typography variant="body1" color="textPrimary" gutterBottom>
                                        {props.about.length === 0 ? '' :
                                            <>
                                                {props.about[0].text.split('\n').map((i, key) => {
                                                    return <Typography key={key} paragraph variant="body1"
                                                                       color="textPrimary"
                                                                       gutterBottom>{i}</Typography>;
                                                })}
                                            </>
                                        }
                                    </Typography>
                                </CardContent>
                                {props.adminMode ? <AdminPanelAboutUs  {...props}/> : ''}
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default AboutUs;

const AdminPanelAboutUs = (props) => {
    //debugger
    const classes = useStyles();
    const [expandedEdit, setExpandedEdit] = React.useState(false);
    const [expandedCreate, setExpandedCreate] = React.useState(false);

    const handleCreateExpandClick = () => {
        setExpandedCreate(!expandedCreate);
        if (!expandedCreate) {
            setInitialData(props, true);
        } else {
            props.getAbout();
        }

    };

    const handleEditExpandClick = () => {
        //debugger
        setExpandedEdit(!expandedEdit);
        if (!expandedEdit) {
            setInitialData(props);
        } else {
            props.setIsChangedAbout(true);
        }

        //props.getId(null);
    };
    const handleRefreshClick = () => {
        props.getAbout();
    };

    const showResults = (values) => {
        //      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

        if (expandedEdit) {
            props.updateAbout(values.id, values.text);
            handleEditExpandClick();
        }

        if (expandedCreate) {
            props.createAbout(values.text);
            handleCreateExpandClick();
        }

    };

    return (
        <>
            <CardActions>
                <Typography variant="body2" color="textPrimary">
                    Создать
                </Typography>
                <Tooltip title={!expandedCreate ? "Создать информацию о нас" : "Отмена"} placement={'top'} arrow>
                    <IconButton onClick={handleCreateExpandClick}
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expandedCreate,
                                })}
                                aria-expanded={expandedCreate}
                                aria-label="Показать больше"
                                disabled={props.about.length !== 0 ? props.about[0]._id !== '0' : null}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Tooltip>
                <Typography variant="body2" color="textPrimary">
                    Редактировать
                </Typography>
                <Tooltip title={!expandedEdit ? "Редактировать описание нашей компании" : "Отмена"} placement={'top'}
                         arrow>
                    <IconButton onClick={handleEditExpandClick}
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expandedEdit,
                                })}
                                aria-expanded={expandedEdit}
                                aria-label="Показать больше"
                                disabled={expandedCreate || props.about.length !== 0 ? props.about[0]._id === '0' : null}>
                        <ExpandMoreIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Обновить"} placement={'top'} arrow>
                    <Button className={classes.buttonSubmit} variant="outlined" size="small"  type="button"
                            disabled={expandedEdit|| props.about.length !== 0 ? props.about[0]._id === '0' : null}
                            onClick={handleRefreshClick}
                            startIcon={<RefreshIcon/>}>
                        Обновить
                    </Button>
                </Tooltip>
            </CardActions>
            <Collapse in={expandedEdit|| expandedCreate} timeout="auto"
                      unmountOnExit>
                <CardContent className={classes.adminPanel}>
                    <Typography variant="h6" color="textPrimary" align="center">
                        ПАНЕЛЬ АДМИНИСТРИРОВАНИЯ
                    </Typography>
                    <EditAboutReduxForm onSubmit={showResults}
                                        expandedEdit={expandedEdit}
                                        {...props}/>
                </CardContent>
            </Collapse>
        </>
    )
}
////////////////////////////////////////////////////////
const setInitialData = (props) => {
    //debugger
    initialData.id = props.about[0]._id;
    initialData.text = props.about[0].text;
}

const initialData = {
    id: null,
    text: ''
}
///////////////////////////////////////////////////////

const EditAboutForm = (props) => {
    const classesStyle = useStyles();
    const {handleSubmit, reset} = props;
    let {pristine, submitting} = props;
    //debugger


    if (props.expandedEdit) {
        pristine = false;
        submitting = false;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                < Field
                    name="text"
                    component={renderTextField}
                    label="Описание нашей компании"
                    multiline
                    rowsMax="10"
                    margin="normal"
                />
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
////////////////////////////
const EditAboutReduxForm = reduxForm({
    form: 'EditAboutForm', // a unique identifier for this form
    validate,
    initialValues: initialData
})(EditAboutForm)