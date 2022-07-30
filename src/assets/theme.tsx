import { createTheme } from '@mui/material';

const theme = createTheme({
    palette:{
        primary:{
            main: '#EBE0FF',
        },
        secondary:{
            main:'#9654BA',
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
    }
});

export default theme;