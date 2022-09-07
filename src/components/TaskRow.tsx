import { MoreHoriz } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Grid, IconButton, Menu, MenuItem, Select, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";
import SetAssigneeModal from "../containers/setAssigneeModal.container";
import { numberToPriority, PriorityIcons } from "../utils/priority";
import { Status } from "../utils/status";
import { TypeIcons } from "../utils/type";
import { getInitials } from "../utils/utils";
import ConfirmationModal from "./ConfirmModal";
import TimeModal from "./TimeModal";

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
        },
        select:{
            padding:'0 16px 0 8px !important',
            minWidth: '75px !important',
            marginRight: '14px !important',
            width: '100% !important',
            display: 'flex !important',
            alignItems: 'center',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
            fontSize:'0.85rem !important'
        },

    })
)

const TaskRow = ({task, clickTask, updateTask, deleteTask, teamId}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [timeModalOpen, setTimeModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [assignTaskOpen, setAssignTaskOpen] = useState(false);

    const onClickTask = (e: any) => {
        e.stopPropagation();
        clickTask(task.id);
    }

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    }

    const updateStatus = (e: any) => {
        updateTask({
            taskId: task.id,
            status: e.target.value,
            folderId: task.folderId,
            teamId    
        });
        setAnchorEl(null);
    }

    const onUpdateTime = (data: any) => {
        setTimeModalOpen(false);
        updateTask({...data, taskId: task.id, folderId: task.folderId, teamId});
    }

    const onDelete = () => {
        deleteTask(task.id, task.folderId);
    }

    const onAssign = (e: any) => {
        e.stopPropagation();
        setAssignTaskOpen(true);
    }

    const onUpdateAssignee = (data: any) => {
        updateTask({
            asignee: data.asignee,
            taskId: task.id,
            folderId: task.folderId,
            teamId,
        })
    }

    return(<>
        {task?.children !== null && task?.children?.length > 0 &&
            <Accordion className={classes.accordion}>
                <AccordionSummary classes={{content: classes.accordionTitle, root:classes.accordionTitle}}>
                <Grid container spacing={1} className={classes.taskRow}>
                    
                    <Grid item xs={3} className={classes.taskDetails} style={{justifyContent:'start'}}>
                        <div className={classes.taskType}>
                        {(TypeIcons as any)[task.type]}
                        </div>
                        <Typography variant="body1" onClick={onClickTask}>
                            {task.name}
                        </Typography>  
                    </Grid>
                    <Grid item xs={3} md={6}>
                    </Grid>
                    <Grid item xs={2} md={1} className={classes.taskDetails}>
                        <Typography variant="body2">{task?.priority? (PriorityIcons as any)[(numberToPriority as any)[task.priority]] : '-'}</Typography>
                    </Grid>
                    <Grid item xs={2} md={1} className={classes.taskDetails}>
                        <Avatar className={classes.assigneeAvatar} onClick={onAssign}>{task?.asignee? getInitials(task?.asignee?.name) : '-'}</Avatar>
                    </Grid>
                    <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <IconButton onClick={openMenu}>
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={setAnchorEl.bind(null,null)}
                    >
                        <MenuItem>
                            <Typography variant='body2' component='span' style={{marginRight: '10px'}}>Status </Typography>
                            <Select classes={{select: classes.select}} value={task?.status} onChange={updateStatus}>
                                {Object.values(Status).map((status)=>
                                    <MenuItem value={status} key={status}>{status}</MenuItem>
                                )}
                            </Select>
                        </MenuItem>
                        <MenuItem onClick={setTimeModalOpen.bind(null,true)}>
                            <Typography variant='body2' component='span'>Log time </Typography>
                        </MenuItem>
                        <MenuItem onClick={setDeleteModalOpen.bind(null,true)}>
                            <Typography variant='body2' component='span'>Delete task</Typography>
                        </MenuItem>
                    </Menu>
                </Grid>
                </Grid>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionContent}>
                    {
                        task.children.map((child: any)=>
                            <TaskRow task={child} key={child.id} clickTask={clickTask} updateTask={updateTask} deleteTask={deleteTask} teamId={teamId}/>
                        )
                    }
                </AccordionDetails>
            </Accordion>
        }
        {(task?.children === null || task?.children?.length === 0) &&
            <Grid container spacing={1} className={classes.taskRow}>
                <Grid item xs={3} className={classes.taskDetails} style={{justifyContent:'start'}}>
                    <div className={classes.taskType}>
                        {(TypeIcons as any)[task.type]}
                    </div>
                   <Typography variant="body1" onClick={onClickTask}>
                    {task.name}
                    </Typography>  
                </Grid>
                <Grid item xs={3} md={6}>
                </Grid>
                <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <Typography variant="body2">{task?.priority? (PriorityIcons as any)[(numberToPriority as any)[task.priority]] : '-'}</Typography>
                </Grid>
                <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <Avatar className={classes.assigneeAvatar} onClick={onAssign}>{task?.asignee? getInitials(task?.asignee?.name) : '-'}</Avatar>
                </Grid>
                <Grid item xs={2} md={1} className={classes.taskDetails}>
                    <IconButton onClick={openMenu}>
                        <MoreHoriz />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={setAnchorEl.bind(null,null)}
                    >
                        <MenuItem>
                            <Typography variant='body2' component='span' style={{marginRight: '10px'}}>Status </Typography>
                            <Select classes={{select: classes.select}} value={task?.status} onChange={updateStatus}>
                                {Object.values(Status).map((status)=>
                                    <MenuItem value={status} key={status}>{status}</MenuItem>
                                )}
                            </Select>
                        </MenuItem>
                        <MenuItem onClick={setTimeModalOpen.bind(null,true)}>
                            <Typography variant='body2' component='span'>Log time </Typography>
                        </MenuItem>
                        <MenuItem onClick={setDeleteModalOpen.bind(null,true)}>
                            <Typography variant='body2' component='span'>Delete task</Typography>
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        }
        {timeModalOpen &&
            <TimeModal open={true} close={setTimeModalOpen.bind(null, false)} taskId={task.id} time={task.timeTracked} onSubmit={onUpdateTime}/>
        }
        <ConfirmationModal 
            onConfirm={onDelete}
            title='Delete Task'
            description="Are you sure you want to delete this task?"
            open={deleteModalOpen}
            onClose={setDeleteModalOpen.bind(null, false)}
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

export default TaskRow