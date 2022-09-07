import { Avatar, Grid, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { numberToPriority, PriorityIcons } from "../utils/priority";
import { TypeIcons } from "../utils/type";
import { getInitials } from "../utils/utils";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        taskRow:{
            padding:'0px',
            margin:'0 !important',
            borderBottom: `1px solid ${theme.palette.primary.light}`,
            position: 'relative',
            width:'100%'
        },
        taskDetails:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:'0 !important'
        },
        taskType:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            paddingTop:'0 !important',
        },
        assigneeAvatar:{
            backgroundColor: `${theme.palette.secondary.light} !important`,
            color: theme.palette.secondary.contrastText,
            width: '1.5rem !important',
            height: '1.5rem !important',
            fontSize: '0.85rem !important'
        }

    })
)

const SubTaskRow = ({task, selectTask}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const onSelectTask = () => {
        selectTask(task.id)
    }

    return(
            <Grid container spacing={0} className={classes.taskRow}>
                <Grid item xs={3} className={classes.taskDetails} style={{justifyContent:'start'}}>
                    <div className={classes.taskType}>
                    {(TypeIcons as any)[task.type]}
                    </div>
                   <Typography variant="body2" onClick={onSelectTask}>
                    {task.name}
                    </Typography>  
                </Grid>
                <Grid item xs={5} md={7}>
                </Grid>
                <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <Typography variant="body2">{task?.priority? (PriorityIcons as any)[(numberToPriority as any)[task.priority]] : '-'}</Typography>
                </Grid>
                <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <Avatar className={classes.assigneeAvatar}>{task?.asignee?.name? getInitials(task?.asignee?.name) : '-'}</Avatar>
                </Grid>
            </Grid>
    )
}

export default SubTaskRow