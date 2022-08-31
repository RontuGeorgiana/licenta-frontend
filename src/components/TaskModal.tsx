import { ChevronLeft, Close, Delete, Edit } from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, MenuItem, Select, TextField, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CommentSection from "../containers/commentSection.container";
import { default as SetAssigneeModal } from "../containers/setAssigneeModal.container";
import { convertPriority, Priority, PriorityIcons } from "../utils/priority";
import { Status } from '../utils/status';
import { Type, TypeIcons } from "../utils/type";
import { getInitials, secondsToTime, timeToSeconds } from "../utils/utils";
import ConfirmationModal from "./ConfirmModal";
import SubTaskRow from "./SubtaskRow";
import TimeModal from "./TimeModal";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        dialog:{
            width:'70% !important',
            maxWidth:'none !important',
            height:'85vh !important',
        },
        dialogTitle:{
            display: "flex !important",
            alignItems: 'center !important',
            justifyContent: 'space-between !important',
            padding:'16px 24px !important'
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
            alignItems: 'center',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
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
            fontSize: '0.85rem !important',
            marginRight: '4px'
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
        h100:{
            height:'100%'
        },
        textBox: {
            padding: '4px 8px !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        },
        time: {
            borderBottom: `1px solid ${theme.palette.info.light}`
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
        datePickerContainer:{
            display: 'flex', 
            alignItems: 'center' 
        },
        datePicker:{
            borderRadius: '4px',
            border: `1px solid ${theme.palette.info.light}`,
            outline: 'none !important',
            minWidth: '0 !important'
        },
        dialogContent:{
            height:'80%'
        },
        scrollableContainer:{
            height:'100%',
            overflowY: 'scroll',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            "&::-webkit-scrollbar": {
                display: 'none'
            }
        },
        formControl:{
            height:'90%',
            width: '100%'
        }
    })
)

const TaskModal = ({open, onClose, parent, editable = false, taskId, task, error, isLoading, getTaskById, setTaskNull, submit, deleteTask, changeTask, openCreateSubtask, teamId} : any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [dueDate, setDueDate]=useState<any>(new Date());
    const [status, setStatus]=useState();
    const [canEdit, setCanEdit] = useState(editable);
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [assignTaskOpen, setAssignTaskOpen] = useState(false);
    const [asignee, setAssignee] = useState<any>();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
      } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
      });

    useEffect(()=>{
        reset();
        if(taskId && !editable){
           getTaskById(taskId, teamId);
           reset();
        }
    },[])

    useEffect(()=>{
        if(!editable){
          getTaskById(taskId, teamId);
            reset();  
        }
    },[taskId])

    const handleClose = () => {
        reset();
        setTaskNull();
        onClose();
    }

    const onUpdateStatus = (e: any) =>{
        if(editable){
            setStatus(e.target.value);
        } else {
            submit({status: e.target.value, taskId });
        }
    }

    const onUpdateTime = (data: any) => {
        setIsTimeModalOpen(false);
        submit({...data, taskId: taskId});
    };

    const onUpdateAssignee = (data: any) => {
        if(editable){
            setAssignee(data);
        } else {
            submit({asignee: data.asignee, taskId: taskId});
        }
        setAssignTaskOpen(false);
    }
   
    const onSubmit = (data: any) => {
        let payload:any = {
            name: data.name,
            description: data.description,
            type: data.type,
            status,
            taskId,
            parent
        }
        if(data.dueDate){
            payload['dueDate'] = data.dueDate;
        }
        if(data.estimation){
            payload['estimation'] = timeToSeconds(data.estimation);
        }
        if(asignee){
            payload['asignee']=asignee.asignee;
        }
        submit(payload);
        setCanEdit(false);
        reset();
        setAssignee(null);
        setStatus(undefined);
    }

    const onDelete = () => {
        deleteTask(taskId);
        setIsDeleteOpen(false);
    }

    const handleCreateSubtask = () => {
        setTaskNull();
        openCreateSubtask();
    }

    return(
        <>
        <Dialog open={open} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <div>
                    {task?.parent &&
                    <div className={classes.backContainer} onClick={() => changeTask(task?.parent)}>
                        <ChevronLeft fontSize='small'/>
                        <Typography variant='body2' component='span'>Parent</Typography>
                    </div>
                    }
                </div>
                
                <IconButton onClick={handleClose}>
                    <Close  fontSize='small'/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent} sx={{overflowY:'hidden !important'}}>
                {!isLoading &&
                <>
                    <div className={classes.detailsRow}>
                    <Select classes={{select: classes.select}} value={task?.status? task?.status : status} onChange={onUpdateStatus}>
                        {Object.values(Status).map((status)=>
                            <MenuItem value={status} key={status}>{status}</MenuItem>
                        )}
                    </Select>
                    <div className={classes.assignee} onClick={setAssignTaskOpen.bind(null, true)}>
                        <Avatar className={classes.assigneeAvatar}>{(editable && asignee?.name)? getInitials(asignee?.name) : task?.asignee?.name ? getInitials(task?.asignee?.name) : '-'}</Avatar>
                        <Typography variant='body2' component='span'>{(editable && asignee?.name)? asignee?.name : task?.asignee? task?.asignee?.name : '---'}</Typography>
                    </div>
                    <div className={classes.assignee} onClick={setIsTimeModalOpen.bind(null, true)}>
                        <Typography variant="body2" component="span">Time : </Typography>
                        <Typography variant="body2" component="span" className={classes.time}>{task?.timeTracked? secondsToTime(task?.timeTracked) : '0H:0M:0S'}</Typography>
                    </div>
                    {!(canEdit || editable)&& 
                        <div>
                            <IconButton onClick={setCanEdit.bind(null, true)}>
                                <Edit fontSize='small'/>
                            </IconButton>
                            <IconButton onClick={setIsDeleteOpen.bind(null, true)}>
                                <Delete fontSize='small' color='error'/>
                            </IconButton>
                        </div>
                    }
                    
                </div>
                <FormControl className={classes.formControl}>
                    <Grid container spacing={1} className={classes.h100}>
                        <Grid item xs={6} md={7} lg={8} className={`${classes.taskColumn} ${classes.scrollableContainer}`} style={{flexDirection:'column'}}>
                            
                            <div className={classes.detailsRow}>
                                <Controller
                                    name='name'
                                    defaultValue={task?.name? task?.name : ''}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            disabled={!(canEdit || editable)}
                                            className={classes.w100} 
                                            inputProps={{className: classes.textBox}}
                                            placeholder="Name"
                                            variant="standard"
                                        />
                                    )}
                                    
                                />
                                
                            </div>
                            <div className={classes.detailsRow}>
                                <Controller  
                                    name='description'
                                    defaultValue={task?.description? task?.description : ''}
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                         <TextField 
                                            multiline
                                            value={value}
                                            onChange = {onChange}
                                            disabled={!(canEdit || editable)} 
                                            minRows={6} 
                                            classes={{root: classes.w100}}
                                            className={classes.textBox} 
                                            InputProps={{className: classes.textBox, style:{fontSize: '0.875rem'}}}
                                            placeholder="Description"
                                            variant="standard"
                                        />
                                    )}
                                />
                               
                            </div>
                            {!editable && 
                                <div className={classes.detailsRow}>
                                    <div className={classes.w100}>
                                        <Typography variant='body1'>Subtasks</Typography>
                                        {task?.children && task?.children.length > 0 &&
                                            task?.children.map((child: any) => (
                                                <SubTaskRow
                                                key={`subtask${child.id}`}
                                                task={child}
                                                selectTask = {changeTask}
                                            />
                                            ))
                                        }
                                        <div className={classes.taskRow} onClick={handleCreateSubtask}>
                                            <Typography variant='body2' className={classes.addTask}>+ Add subtask</Typography>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!editable &&
                                <div className={classes.detailsRow}>
                                    <div className={classes.w100}>
                                        <Typography variant='body1'>Comments</Typography>
                                        <CommentSection comments={task?.comments} taskId={task?.id} teamId={teamId}/>
                                        
                                    </div>
                                </div>
                            }
                            
                        </Grid>
                        <Grid item xs={1} className={classes.divider}>
                            <Divider orientation="vertical" variant="middle" flexItem/>
                        </Grid>
                        <Grid item xs={5} md={4} lg={3} className={classes.taskColumn} style={{flexDirection:'column'}}>
                            <div className={classes.detailsRow}>
                                <Grid container spacing={1} className={`${classes.assignee} ${classes.w100}`}>
                                    <Grid item xs={4}>
                                        <Typography variant='body2' component='span'>Due : </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <LocalizationProvider
                                            dateAdapter={ AdapterDateFns }
                                            >
                                                <Controller 
                                                    name='dueDate'
                                                    defaultValue={task?.dueDate? new Date(task?.dueDate) : ''}
                                                    control={control}
                                                    render={({ field: { onChange, value } }) => (
                                                        <DatePicker
                                                            value={value}
                                                            disabled={!(canEdit || editable)} 
                                                            onChange={(newValue: any) => {
                                                                onChange(newValue);
                                                            }}
                                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                                <Box className={classes.datePickerContainer}>
                                                                <input ref={inputRef} className={`${classes.textBox} ${classes.datePicker}`} {...inputProps} />
                                                                {InputProps?.endAdornment}
                                                                </Box>
                                                            )}
                                                        />
                                                    )}
                                                />
                                                
                                            </LocalizationProvider>
                                    </Grid>
                                    
                                </Grid>
                            </div>
                            <div className={classes.detailsRow}>
                                <Grid container spacing={1} className={`${classes.assignee} ${classes.w100}`}>
                                    <Grid item xs={4}>
                                        <Typography variant='body2' component='span'>Estimate : </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Controller 
                                                name='estimation'
                                                defaultValue={task?.estimation? secondsToTime(task?.estimation) : ''}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <TextField
                                                        value={value}
                                                        onChange={onChange}
                                                        disabled={!(canEdit || editable)}
                                                        className={classes.w100}
                                                        inputProps={{className: classes.textBox, style:{fontSize: '0.875rem'}}}
                                                        placeholder="Time"
                                                        variant="standard"
                                                    />
                                                )}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.detailsRow}>
                                <Grid container spacing={1} className={`${classes.assignee} ${classes.w100}`}>
                                    <Grid item xs={4}>
                                        <Typography variant='body2' component='span'>Priority : </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                    <Controller
                                        name='priority'
                                        defaultValue={task?.priority? task?.priority : null}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select 
                                                classes={{select: classes.select}} 
                                                className={classes.w100} 
                                                value={value} 
                                                onChange={onChange}
                                                disabled={!(canEdit || editable)} 
                                            >
                                                {Object.values(Priority).map((priority: any) => 
                                                    <MenuItem value={convertPriority(null, priority)} key={`priority${priority}`}>
                                                        {(PriorityIcons as any)[priority]}
                                                        {priority}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        )}
                                    />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.detailsRow}>
                                <Grid container spacing={1} className={`${classes.assignee} ${classes.w100}`}>
                                    <Grid item xs={4}>
                                        <Typography variant='body2' component='span'>Type : </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Controller 
                                            name='type'
                                            defaultValue={task?.type? task?.type : null}
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Select 
                                                    classes={{select: classes.select}} 
                                                    className={classes.w100} 
                                                    value={value} 
                                                    onChange={onChange}
                                                    disabled={!(canEdit || editable)} 
                                                >
                                                    {Object.values(Type).map((type: any) => 
                                                        <MenuItem value={type} key={`type${type}`}>
                                                            {(TypeIcons as any)[type]}
                                                            {type}
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </FormControl>
                </>
            }
            </DialogContent>
            {(canEdit || editable) &&
                <DialogActions className={classes.dialogTitle}>
                    <Button color='info' onClick={setCanEdit.bind(null, false)}>Cancel</Button>
                    <Button color='secondary' variant='contained' onClick={handleSubmit(onSubmit)}>Save</Button>
                </DialogActions>
            }
        </Dialog>
        {isTimeModalOpen &&
            <TimeModal open={true} close={setIsTimeModalOpen.bind(null, false)} taskId={taskId} time={task?.timeTracked} onSubmit={onUpdateTime}/>
        }
            <ConfirmationModal 
                onConfirm={onDelete}
                title='Delete Task'
                description="Are you sure you want to delete this task?"
                open={isDeleteOpen}
                onClose={setIsDeleteOpen.bind(null, false)}
            />
        {assignTaskOpen &&
            <SetAssigneeModal
                onClose={setAssignTaskOpen.bind(null, false)}
                teamId = {teamId}
                updateTaskAssignee={onUpdateAssignee}
            />
        }
        </>
    )
}

export default TaskModal