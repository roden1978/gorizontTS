import {createMuiTheme} from '@material-ui/core/styles'


export const Theme = createMuiTheme({
    overrides: {
        MuiCardHeader: {
            title: {
                fontSize: "medium",
                color: 'coral'
            },
            root: {
                padding: '8px'
            }
        },
    },
    typography: {
        fontFamily: 'Montserrat Alternates',
    },
});
