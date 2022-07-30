import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, Card, Container, FormControl, IconButton, OutlinedInput, TextField, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles, useTheme } from '@mui/styles';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import { login } from '../redux/actions/auth';
import { loginValidations } from '../utils/validations';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container:{
            display: 'flex !important',
            flexDirection: 'column',
            background: theme.palette.primary.light,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            maxWidth: 'none !important',
        },
        card:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            borderRadius:'10px !important',
            boxShadow: `0px 2px 1px -1px ${theme.palette.primary.dark} !important`,
            minWidth: '400px'
        },
        form: {
            display: "flex",
            flexDirection: "column",
            width: "70%",
            height: "100%",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
        },
        input:{
            width: '100%',
            height: '3rem',
            display: "block",
            marginBottom: "1rem !important",
        },
        title:{
            marginBottom: '1rem !important',
            color: theme.palette.primary.contrastText,
        },
        button:{
            backgroundColor:`${theme.palette.secondary.main} !important`,
            color: `${theme.palette.secondary.contrastText} !important`,
            width: '50%',
            margin: '1rem 0!important'
        },
        text:{
            fontSize:'0.9rem !important'
        },
        link:{
            textDecoration:'none'
        }
        
    })
)

const Login = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {setAuthState} = useAuthContext();
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');

    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });

    const onSubmit = (data: any) => {
        login(data).then((response: any) => {
            if (response) {
              setAuthState({ isAuthenticated: true });
            }
        }).catch((error) => {
            setError(error?.response?.data?.message)
        });
    }

    return(
        <Container className={classes.container}>
            <Card className={classes.card}>
                <Typography variant='h5' component='h5' className={classes.title}>Login</Typography>
                <FormControl className={classes.form}>
                    <Controller
                        name='username'
                        control={control}
                        rules={loginValidations.email}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <TextField 
                                    fullWidth
                                    onChange={onChange}
                                    value={value || ""}
                                    variant='outlined'
                                    size='small'
                                    className={ classes.input }
                                    label='Email'
                                    error={errors['username'] && true}
                                    helperText = {<>{errors['username']?.message}</>}
                                />
                            )
                        }}
                    />
                    <Controller
                        name='password'
                        control={control}
                        rules={loginValidations.password}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <>
                                <OutlinedInput
                                    fullWidth
                                    onChange={onChange}
                                    value={value || ""}
                                    size='small'
                                    type={showPass? 'text' : 'password'}
                                    className={ classes.input }
                                    placeholder='Password'
                                    error={errors['password'] && true}
                                    endAdornment={<IconButton onClick={()=>{setShowPass(!showPass)}}>
                                        {showPass ? (
                                            <VisibilityIcon sx={{ color: (theme as Theme).palette.primary.dark, fontSize:'medium' }}/>
                                        ):(
                                            <VisibilityOffIcon sx={{ color: (theme as Theme).palette.primary.dark, fontSize:'medium' }}/>
                                        )}
                                    </IconButton>}
                                />
                                <p>
                                    <>{errors['password']?.message}</>
                                </p>
                                </>
                            )
                        }}
                    />
                    <Button
                        variant='contained'
                        className={classes.button}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Login
                    </Button> 
                    <Typography variant='body2' color='error'>{error}</Typography>
                    <Typography className={classes.text}>Don't have an account? <Link className={classes.link} to="/signup">Sign up</Link></Typography>
                </FormControl>
            </Card>
        </Container>
    )
};

export default Login;