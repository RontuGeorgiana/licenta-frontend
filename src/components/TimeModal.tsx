import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, TextField, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import { secondsToTime, timeToSeconds } from "../utils/utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialog:{
            width:'30% !important',
            maxWidth:'none !important',
        },
        dialogTitle:{
            display: "flex !important",
            alignItems: 'center !important',
            justifyContent: 'space-between !important',
            padding:'16px 24px !important'
        },
        textBox: {
            padding: '4px 8px !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        },
        w100:{
            width:'100%'
        },
    })
)

const TimeModal = ({open, close, taskId, time, onSubmit} :any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
      });

    const submit = (data: any) => {
        onSubmit({timeTracked: timeToSeconds(data.timeTracked)});
        reset();
    }

    return(
        <Dialog open={open} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <Typography variant='h6' component='span'>Tracked Time</Typography>
                <IconButton onClick={close}>
                    <Close  fontSize='small'/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <FormControl className={classes.w100}>
                    <Controller
                        name='timeTracked'
                        control={control}
                        defaultValue={time? secondsToTime(time) : '0H:0M:0S'}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                value={value}
                                onChange={onChange}
                                className={classes.w100}
                                inputProps={{className: classes.textBox}}
                            />
                        )}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions className={classes.dialogTitle}>
                    <Button color='info' onClick={close}>Cancel</Button>
                    <Button color='secondary' variant='contained' onClick={handleSubmit(submit)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TimeModal