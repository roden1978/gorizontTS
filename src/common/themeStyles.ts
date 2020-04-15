import {createMuiTheme} from '@material-ui/core/styles'


export const Theme = createMuiTheme({
    overrides: {
        MuiCard:{
          root:{
              boxShadow: '5px 5px 5px 0px silver'
          }
        },
        MuiCardHeader: {
            title: {
                fontSize: "large",
                color: 'coral',
            },
            root: {
                background:
                    'linear-gradient(to bottom, #c6ccda, #ffffff 80%)',
            },
            subheader: {
                fontWeight: 'bold',
                fontSize: 'large'
            }
        },
        MuiTypography: {
            paragraph: {
                marginBottom: '8px',
                textIndent: '1.5em',
            }
        },
        MuiTableCell: {
            root: {
                fontSize: '14px'
            }
        },
        MuiCardContent: {
            root: {
                paddingLeft: '16px',
                paddingRight: '16px'
            }
        },
    },
    typography: {
        fontFamily: 'Montserrat Alternates',
        body1: {
            fontSize: '14px',
        },
        body2: {
            fontSize: 'small'
        },
        h4: {
            color: 'coral',
            textShadow: '1px 1px 2px black'
        }
    },
});

export const mobileTheme = createMuiTheme({
    overrides: {
        MuiCardHeader: {
            title: {
                fontSize: "small",
                color: 'coral',
            },
            root: {
                //padding: '8px'
                background:
                    'linear-gradient(to bottom, #c6ccda, #ffffff 80%)',
            },
            subheader: {
                fontSize: 'small'
            }
        },
        MuiTypography: {
            paragraph: {
                marginBottom: '4px',
                textIndent: '0.5em',
                // textAlign:'justify'
            }
        },
        MuiCardContent: {
            root: {
                padding: '4px'
            }
        },
        MuiTableCell: {
            root: {
                fontSize: '8px'
            }
        },
    },
    typography: {
        fontFamily: 'Montserrat Alternates',
        body1: {
            fontSize: 'x-small',
        },
        body2: {
            fontSize: 'x-small'
        }
    },
});
