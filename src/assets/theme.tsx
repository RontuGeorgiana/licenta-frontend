import { createTheme } from '@mui/material';

const theme = createTheme({
    palette:{
        primary:{
            main: '#CADDFF',
        },
        secondary:{
            main:'#6070DF',
        },
        error:{
            main:'#D51243',
        },
        warning:{
            main:'#D8DF13'
        },
        info:{
            main:'#5F6778'
        },
        success:{
            main:'#21A65F',
        },
        tonalOffset:{
            dark: 0.3,
            light: 0.4,
        }
    },
    typography:{
        fontSize: 12,
    }
});

export default theme;