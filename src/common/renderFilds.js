import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import React from "react"

export const renderTextField = ({
                                    label,
                                    input,
                                    value,
                                    meta: {touched, invalid, error},
                                    inputProps,
                                    ...custom
                                }) => (
    <TextField
        label={label}
        value={input.value}
        placeholder={label}
        error={touched && invalid}
        fullWidth
        helperText={touched && error}
        {...input}
        {...inputProps}
        {...custom}
    />
)

/*
type RenderCheckboxPropsType = {
    input: HTMLInputElement
    label: string
    disabled: boolean
}

type RenderCheckbox = {
    renderCheckbox: (props: RenderCheckboxPropsType) => void
}*/

export const renderCheckbox = ({input, label, disabled}) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                    disabled={disabled}
                />
            }
            label={label}
        />
    </div>
)

export const renderFromHelper = ({touched, error}) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

export const renderSelectField = ({
                                      input,
                                      label,
                                      meta: {touched, error},
                                      children,
                                      ...custom
                                  }) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
        <Select
            native
            onChange={input.onChange}
            {...input}
            {...custom}
        >
            {children}
        </Select>
        {renderFromHelper({touched, error})}
    </FormControl>
)

