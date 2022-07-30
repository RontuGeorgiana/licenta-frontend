import { ChevronLeft, Close, Delete, Edit } from "@mui/icons-material"
import { Avatar, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Select, TextField, Theme, Typography, useTheme } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import { useState } from "react"
import { Type } from "../utils/type"
import SubTaskRow from "./SubtaskRow"

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        dialog:{
            width:'70% !important',
            maxWidth:'none !important',
        },
        dialogTitle:{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        backContainer:{
            display: "flex",
            alignItems: 'center',
            justifyContent: 'start'
        },
        taskColumn: {
            display: "flex",
            alignItems: 'start',
            justifyContent: 'center'
        },
        detailsRow: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between',
            width:'100%',
            marginBottom:'1rem'
        },
        select:{
            padding:'0 8px !important',
            minWidth: '75px !important'
        },
        assignee: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'start'
        },
        assigneeAvatar:{
            backgroundColor: `${theme.palette.secondary.light} !important`,
            color: theme.palette.secondary.contrastText,
            width: '1.5rem !important',
            height: '1.5rem !important',
            fontSize: '0.85rem !important'
        },
        w100:{
            width:'100%'
        },
        w80:{
            width:'80%'
        },
        textBox: {
            padding: '4px 8px !important'
        },
        taskRow:{
            padding:'6px 0',
            margin:'0 !important',
            borderBottom: `1px solid ${theme.palette.primary.light}`,
            width:'100%'
        },
        addTask:{
            color: theme.palette.info.main,
            padding: '0 4px'
        },
        divider:{
            margin:'0 8px !important'
        },
    })
)

const TaskModal = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [dueDate, setDueDate]=useState<any>()

    return(
        <Dialog open={true} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <div className={classes.backContainer}>
                    <ChevronLeft fontSize='small'/>
                    <Typography variant='body2' component='span'>Parent</Typography>
                </div>
                <IconButton>
                    <Close  fontSize='small'/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className={classes.detailsRow}>
                    <Select classes={{select: classes.select}}/>
                    <div className={classes.assignee}>
                        <Avatar className={classes.assigneeAvatar}>A</Avatar>
                        <Typography variant='body2' component='span'>Assignee</Typography>
                    </div>
                    <div className={classes.assignee}>
                        <Typography variant="body2" component="span">Time : </Typography>
                        <TextField
                            className={classes.w80}
                            inputProps={{className: classes.textBox}}
                            placeholder="Time"
                        />
                    </div>
                    <IconButton>
                        <Edit fontSize='small'/>
                    </IconButton>
                    <IconButton>
                        <Delete fontSize='small'/>
                    </IconButton>
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.taskColumn} style={{flexDirection:'column'}}>
                        
                        <div className={classes.detailsRow}>
                            <TextField 
                                className={classes.w100} 
                                inputProps={{className: classes.textBox}}
                                placeholder="Name"
                            />
                        </div>
                        <div className={classes.detailsRow}>
                            <TextField 
                                multiline 
                                minRows={6} 
                                classes={{root: classes.w100,}} 
                                InputProps={{className: classes.textBox}}
                                placeholder="Description"
                            />
                        </div>
                        <div className={classes.detailsRow}>
                            <div className={classes.w100}>
                                <Typography variant='body1'>Subtasks</Typography>
                                <SubTaskRow 
                                    task={{
                                        name:'subtask',
                                        assignee: null,
                                        priority: null,
                                        type: Type.SUBTASK,
                                        children: null
                                    }}
                                />
                                <div className={classes.taskRow}>
                                    <Typography variant='body2' className={classes.addTask}>+ Add subtask</Typography>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={1} className={classes.taskColumn}>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                    </Grid>
                    <Grid item xs={5} className={classes.taskColumn}>
                        <div className={classes.detailsRow}>
                            <div className={classes.assignee}>
                                <Typography variant='body2' component='span'>Due : </Typography>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default TaskModal