import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField, Theme, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import { addTeamValidation } from "../utils/validations";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container:{
            padding:'1rem'
        },
        input:{
            width: '100%',
            height: '3rem',
            display: "block",
        },
        title:{
            padding:0,
            display:'flex',
            justifyContent:'center'
        },
        content:{
            display:'flex',
            flexDirection: 'column',
            justifyContent:'center'
        },
        description:{
            marginBottom:'1rem'
        },
        actions:{
            paddingTop: 0,
            display:'flex',
            justifyContent:'space-between'
        }
    })
)

const NameModal = ({submit, title, description, open, onClose, teamId}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
      } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });

    const onSubmit = (data: any) => {
        submit(data);
        reset();
    }

    return(
        <Dialog open={open} onClose={onClose} classes={{paper: classes.container}}>
            <DialogTitle className={classes.title}>
                {title}
            </DialogTitle>
            <DialogContent className={classes.content}>
                <DialogContentText className={classes.description}>
                    {description}
                </DialogContentText>
                <FormControl>
                    <Controller
                        name='name'
                        control={control}
                        rules={addTeamValidation.name}
                        render={({ field: { onChange, value } }) => {
                            return(
                                <TextField
                                    fullWidth
                                    onChange={onChange}
                                    value={value || ""}
                                    variant='outlined'
                                    size='small'
                                    className={ classes.input }
                                    label='Name'
                                    error={errors['name'] && true}
                                    helperText = {<>{errors['name']?.message}</>}
                                />
                            )
                        }}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button onClick={onClose} color='info'>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} variant='contained' color='secondary'>Add</Button>
            </DialogActions>
        </Dialog>
    )
} 

export default NameModal;