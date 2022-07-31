import { ChevronLeft, Close, Delete, Edit } from "@mui/icons-material"
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Avatar, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, MenuItem, Select, TextField, Theme, Typography, useTheme } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import ro from 'date-fns/locale/ro'
import { useState } from "react"
import { Priority, PriorityIcons } from "../utils/priority"
import { Type, TypeIcons } from "../utils/type"
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
            alignItems: 'center',
            justifyContent: 'start',
            width:'100%',
        },
        detailsRow: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between',
            width:'100%',
            marginBottom:'1rem'
        },
        select:{
            padding:'0 16px 0 8px !important',
            minWidth: '75px !important',
            marginRight: '14px !important',
            width: '100% !important',
            display: 'flex !important',
            alignItems: 'center'
        },
        assignee: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'start',
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
        w70:{
            width:'70%'
        },
        textBox: {
            padding: '4px 8px !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
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
            display: "flex",
            alignItems: 'start',
            justifyContent: 'center',
            width:'100%',
        },
    })
)

const TaskModal = ({open, onClose, parent, editable = false} : any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [dueDate, setDueDate]=useState<any>(new Date())

    return(
        <Dialog open={open} classes={{paper: classes.dialog}}>
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
                            variant="standard"
                        />
                    </div>
                    {!editable && 
                        <div>
                            <IconButton>
                                <Edit fontSize='small'/>
                            </IconButton>
                            <IconButton>
                                <Delete fontSize='small'/>
                            </IconButton>
                        </div>
                    }
                    
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.taskColumn} style={{flexDirection:'column'}}>
                        
                        <div className={classes.detailsRow}>
                            <TextField
                                value={'aaaaaaaaaa'}
                                disabled={!editable}
                                className={classes.w100} 
                                inputProps={{className: classes.textBox}}
                                placeholder="Name"
                                variant="standard"
                            />
                        </div>
                        <div className={classes.detailsRow}>
                            <TextField 
                                multiline
                                disabled={!editable} 
                                minRows={6} 
                                classes={{root: classes.w100,}} 
                                InputProps={{className: classes.textBox, style:{fontSize: '0.875rem'}}}
                                placeholder="Description"
                                variant="standard"
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
                    <Grid item xs={1} className={classes.divider}>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                    </Grid>
                    <Grid item xs={5} className={classes.taskColumn} style={{flexDirection:'column'}}>
                        <div className={classes.detailsRow}>
                            <div className={classes.assignee}>
                                <Typography variant='body2' component='span'>Due : </Typography>
                                <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                                locale={ro}
                                >
                                    <DatePicker
                                        inputFormat="dd/MM/yyyy"
                                        disableFuture
                                        value={dueDate}
                                        onChange={(newValue: any) => {
                                            setDueDate(newValue);
                                        }}
                                        renderInput={(params: any) => 
                                            <TextField variant="outlined" {...params}/>
                                        }/>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className={classes.detailsRow}>
                            <div className={classes.assignee}>
                                <Typography variant='body2' component='span'>Estimate : </Typography>
                                <TextField
                                    // value={'2H'}
                                    disabled={!editable}
                                    className={classes.w70}
                                    inputProps={{className: classes.textBox, style:{fontSize: '0.875rem'}}}
                                    placeholder="Time"
                                    variant="standard"
                                />
                            </div>
                        </div>
                        <div className={classes.detailsRow}>
                            <Grid container spacing={1} className={`${classes.assignee} ${classes.w100}`}>
                                <Grid item xs={4}>
                                    <Typography variant='body2' component='span'>Priority : </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                <Select classes={{select: classes.select}} className={classes.w100}>
                                    {Object.values(Priority).map((priority: any) => 
                                        <MenuItem value={priority}>
                                            {(PriorityIcons as any)[priority]}
                                            {priority}
                                        </MenuItem>
                                    )}
                                </Select>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.detailsRow}>
                        <Grid container spacing={1} className={`${classes.assignee} ${classes.w100}`}>
                                <Grid item xs={4}>
                                    <Typography variant='body2' component='span'>Type : </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                <Select classes={{select: classes.select}} className={classes.w100}>
                                    {Object.values(Type).map((type: any) => 
                                        <MenuItem value={type}>
                                            {(TypeIcons as any)[type]}
                                            {type}
                                        </MenuItem>
                                    )}
                                </Select>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default TaskModal