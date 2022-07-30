import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, Card, Container, FormControl, TextField, Theme, Tooltip, Typography } from "@mui/material";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import { useAuthContext } from '../auth/AuthContext';
import { signup } from '../redux/actions/auth';
import { signupValidations } from "../utils/validations";

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
        },
        inputRow:{
            width: '100%',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            marginBottom:"1.5rem"
        },
        toolTip:{
            position: 'absolute',
            right: "-20px",
            marginLeft: '4px',
            top:'0.7rem'
        },
        button:{
            backgroundColor:`${theme.palette.secondary.main} !important`,
            color: `${theme.palette.secondary.contrastText} !important`,
            width: '50%',
            margin: '1rem 0!important'
        },
        title:{
            marginBottom: '1rem !important',
            color: theme.palette.primary.contrastText,
        },
    })
);

const SignUp = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {setAuthState} = useAuthContext();

    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setError,
      } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });
    
    const validateConfirm = (confirm: String) =>{
        return confirm === getValues('password') || 'Passwords do not match';
    } 

    const onSubmit = (data: any) => {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }

        signup(payload).then((response: any) => {
            if (response) {
              setAuthState({ isAuthenticated: true });
            }
        });
    }

    return(
        <Container className={classes.container}>
            <Card className={classes.card}>
                <Typography variant='h5' component='h5' className={classes.title}>Sign up</Typography>
                <FormControl className={classes.form}>
                    <Controller
                        name='firstName'
                        control={control}
                        rules={signupValidations.firstName}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className={classes.inputRow}>
                                <TextField
                                    fullWidth
                                    onChange={onChange}
                                    value={value || ""}
                                    variant='outlined'
                                    size='small'
                                    className={ classes.input }
                                    label='First Name'
                                    error={errors['firstName'] && true}
                                    helperText = {<>{errors['firstName']?.message}</>}
                                />
                                </div>
                            )
                        }}
                    />
                     <Controller
                        name='lastName'
                        control={control}
                        rules={signupValidations.lastName}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className={classes.inputRow}>
                                <TextField
                                    fullWidth
                                    onChange={onChange}
                                    value={value || ""}
                                    variant='outlined'
                                    size='small'
                                    className={ classes.input }
                                    label='Last Name'
                                    error={errors['lastName'] && true}
                                    helperText = {<>{errors['lastName']?.message}</>}
                                />
                                </div>
                            )
                        }}
                    />
                     <Controller
                        name='email'
                        control={control}
                        rules={signupValidations.email}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className={classes.inputRow}>
                                <TextField 
                                    fullWidth
                                    onChange={onChange}
                                    value={value || ""}
                                    variant='outlined'
                                    size='small'
                                    className={ classes.input }
                                    label='Email'
                                    error={errors['email'] && true}
                                    helperText = {<>{errors['email']?.message}</>}
                                />
                                </div>
                            )
                        }}
                    />
                    <Controller
                        name='password'
                        control={control}
                        rules={signupValidations.password}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className={classes.inputRow}>
                                    <TextField 
                                        fullWidth
                                        onChange={onChange}
                                        value={value || ""}
                                        variant='outlined'
                                        size='small'
                                        type='password'
                                        className={ classes.input }
                                        label='Password'
                                        error={errors['password'] && true}
                                        helperText = {<>{errors['password']?.message}</>}
                                    />
                                    <Tooltip 
                                    className={classes.toolTip}
                                    title={
                                        <div>
                                            <Typography variant="body1" component="p">Password must:</Typography>
                                            <Typography variant="body2" component="li">Be at least 8 characters long</Typography>
                                            <Typography variant="body2" component="li">Contain a lowercase character</Typography>
                                            <Typography variant="body2" component="li">Contain an uppercase character</Typography>
                                            <Typography variant="body2" component="li">Contain a digit</Typography>
                                            <Typography variant="body2" component="li">Contain a special character</Typography>
                                        </div>
                                    }>
                                        <InfoOutlinedIcon  sx={{ color: (theme as Theme).palette.primary.dark, fontSize:'medium' }}/>
                                    </Tooltip>
                                </div>  
                            )
                        }}
                    />
                     <Controller
                        name='confirmPassword'
                        control={control}
                        rules={{required: {value: true, message: 'Confirm password is required'},
                                validate: {validateConfirm:(confirm: string) => validateConfirm(confirm)}
                                }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <div className={classes.inputRow}>
                                <TextField 
                                    fullWidth
                                    onChange={onChange}
                                    value={value || ""}
                                    variant='outlined'
                                    size='small'
                                    type='password'
                                    className={ classes.input }
                                    label='Confirm Password'
                                    error={errors['confirmPassword'] && true}
                                    helperText = {<>{errors['confirmPassword']?.message}</>}
                                />
                                </div>
                            )
                        }}
                    />
                    <Button
                        variant='contained'
                        className={classes.button}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Sign up
                    </Button>
                </FormControl>
            </Card>
        </Container>
    )
}

export default SignUp;