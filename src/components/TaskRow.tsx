import { Accordion, AccordionDetails, AccordionSummary, Avatar, Grid, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { TypeIcons } from "../utils/type";
import { getInitials } from "../utils/utils";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        accordion:{
            boxShadow: 'none !important',
            border: 'none',
            borderRadius: '0 !important',
            margin: '0 !important',
            backgroundColor:`${theme.palette.primary.light} !important`
        },
        accordionTitle:{
            display: 'flex',
            padding:'0px !important',
            margin:'0px !important',
            minHeight: '0px !important',
            backgroundColor: theme.palette.background.default
        },
        accordionContent:{
            padding:'0px !important',
            marginLeft: '6px !important',
            backgroundColor: theme.palette.background.default
        },
        taskRow:{
            display:'flex',
            padding:'8px 16px',
            margin:'0 !important',
            borderBottom: `1px solid ${theme.palette.primary.light}`,
            position: 'relative'
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
            position: "absolute",
            left:'2px'
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

const TaskRow = ({task}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    console.log(task)

    return(<>
        {task.children !== null && task.children.length > 0 &&
            <Accordion className={classes.accordion}>
                <AccordionSummary classes={{content: classes.accordionTitle, root:classes.accordionTitle}}>
                <Grid container spacing={1} className={classes.taskRow}>
                    <div className={classes.taskType}>
                        {(TypeIcons as any)[task.type]}
                    </div>
                    <Grid item xs={3} className={classes.taskDetails} style={{justifyContent:'start'}}>
                    <Typography variant="body1">
                        {task.name}
                        </Typography>  
                    </Grid>
                    <Grid item xs={3} md={6}>
                    </Grid>
                    <Grid item xs={2} md={1} className={classes.taskDetails}>
                        <Typography variant="body2">{task?.priority? task.priority : '-'}</Typography>
                    </Grid>
                    <Grid item xs={2} md={1} className={classes.taskDetails}>
                        <Avatar className={classes.assigneeAvatar}>{task?.asignee? getInitials(task?.asignee?.name) : '-'}</Avatar>
                    </Grid>
                </Grid>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionContent}>
                    {
                        task.children.map((child: any)=>
                            <TaskRow task={child}/>
                        )
                    }
                </AccordionDetails>
            </Accordion>
        }
        {(task.children === null || task.children.length === 0) &&
            <Grid container spacing={1} className={classes.taskRow}>
                <div className={classes.taskType}>
                    {(TypeIcons as any)[task.type]}
                </div>
                <Grid item xs={3} className={classes.taskDetails} style={{justifyContent:'start'}}>
                   <Typography variant="body1">
                    {task.name}
                    </Typography>  
                </Grid>
                <Grid item xs={3} md={6}>
                </Grid>
                <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <Typography variant="body2">{task?.priority? task.priority : '-'}</Typography>
                </Grid>
                <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <Avatar className={classes.assigneeAvatar}>{task?.asignee? getInitials(task?.asignee?.name) : '-'}</Avatar>
                </Grid>
            </Grid>
        }
    </>    
    )
}

export default TaskRow