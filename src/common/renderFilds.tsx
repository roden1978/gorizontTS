import React from 'react'
import TextField, {
    BaseTextFieldProps,
    StandardTextFieldProps,
    TextFieldProps
} from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import {WrappedFieldProps} from "redux-form";
import {FormControlLabelProps} from "@material-ui/core/FormControlLabel/FormControlLabel";
import {CheckboxProps} from "@material-ui/core/Checkbox/Checkbox";
import {SelectProps} from "@material-ui/core/Select/Select";

type RenderTextField = (params: WrappedFieldProps & TextFieldProps) => React.ReactFragment


export const renderTextField: RenderTextField = ({
                                                     label,
                                                     value,
                                                     input,
                                                     variant,
                                                     color,
                                                     meta: {touched, invalid, error},
                                                     ...custom
                                                 }): React.ReactFragment => {

    return <TextField label={label!}
                      value={input.value}
                      placeholder={label!.toString()}
                      error={touched && invalid}
                      fullWidth
                      helperText={touched && error}
                      {...input}
                      {...custom}
    />
}

type RenderCheckBox = (params: WrappedFieldProps & FormControlLabelProps & CheckboxProps) => React.ReactFragment

export const renderCheckbox: RenderCheckBox = ({input, label, disabled}): React.ReactFragment => (

    <FormControlLabel
        control={
            < Checkbox
                checked={input.value ? true : false}
                onChange={input.onChange}
                disabled={disabled}
            />
        }
        label={label}
    />
)

type Params = {
    touched: boolean
    error: any
}
type RenderFromHelper = (params: Params) => React.ReactFragment
//
export const renderFromHelper: RenderFromHelper = ({touched, error}): React.ReactFragment => {

    if (!(touched && error)) {
        return <></>
    } else {
        return <FormHelperText>
            {touched && error}
        </FormHelperText>
    }
}

type RenderSelectedField = (params: WrappedFieldProps &
    TextFieldProps & SelectProps) => React.ReactFragment

export const renderSelectField: RenderSelectedField = ({
                                                           input,
                                                           label,
                                                           meta: {touched, error},
                                                           children,
                                                           ...custom
                                                       }): React.ReactFragment => (
    <React.Fragment>
        <FormControl error={touched && error}>
            <InputLabel htmlFor="age-native-simple"> {label} </InputLabel>
            <Select
                native
                onChange={input.onChange}
                {...input}
                {...custom}>
                {children}
            </Select>
            {
                renderFromHelper({touched, error})
            }
        </FormControl>
    </React.Fragment>
)

