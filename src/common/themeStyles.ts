import {createMuiTheme} from '@material-ui/core/styles'


export const Theme = createMuiTheme({
    overrides: {
        MuiCardHeader: {
            title: {
                fontSize: "medium",
                color: 'coral',
            },
            root: {
                //padding: '8px'
            },
            subheader:{
                fontWeight:'bold',
                fontSize:'large'
            }
        },
        MuiTypography:{
            paragraph:{
                marginBottom: '8px',
                textIndent: '1.5em',
            }
        }
    },
    typography: {
        fontFamily: 'Montserrat Alternates',
        /*body1:{
            textIndent: '1.5em',
        },*/
    },
});
