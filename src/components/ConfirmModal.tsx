import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Theme, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container:{
            padding:'1rem'
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


const ConfirmationModal = ({onConfirm, onClose, open, title, description}: any) =>{
    const theme = useTheme();
    const classes = useStyles(theme);

    return(
        <Dialog open={open} onClose={onClose} classes={{paper: classes.container}}>
            <DialogTitle className={classes.title}>
                {title}
            </DialogTitle>
            <DialogContent className={classes.content}>
                <DialogContentText className={classes.description}>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='info'>Cancel</Button>
                <Button onClick={onConfirm} variant='contained' color='secondary'>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationModal;