import { AddOutlined } from "@mui/icons-material";
import { Card, Container, Grid, IconButton, Tab, Tabs, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SetAssigneeModal from "../containers/setAssigneeModal.container";
import TaskModal from "../containers/taskModal.container";
import TaskRow from "../containers/taskRow.container";
import { Status } from "../utils/status";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container:{
            height:'100%',
            width:'100%',
            display: 'flex !important',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'start',
        },
        titleContainer:{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            width:'100%'
        },
        headerContainer:{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'end',
            width:'100%',
        },
        tabsContainer:{
            display: 'flex',
            justifyContent: "start",
            alignItems: 'end',
            width:'100%',
        },
        tabsFlex:{
            paddingTop:'5px'
        },
        tab:{
            backgroundColor: `${theme.palette.background.default} !important`,
            borderRadius:'4px 4px 0px 0px !important',
            boxShadow:'0px 0px 0px 1px rgb(0 0 0 / 10%)',
            padding: '8px !important',
            minHeight: '0 !important'
        },
        tabSelected:{
            backgroundColor: `${theme.palette.primary.light} !important`,
            color: `${theme.palette.primary.contrastText} !important`,
            borderRadius:'4px 4px 0px 0px !important',
            boxShadow:'0px 0px 0px 1px rgb(0 0 0 / 10%)',
            padding: '8px !important',
            minHeight: '0 !important'
        },
        card:{
            width:'100%',
            padding:'0 0 16px 0px',
            margin:'0 16px',
            height:'100%',
            borderTopLeftRadius:'0 !important',
        },
        header: {
            display:'flex',
            justifyContent:'end',
            background:theme.palette.primary.light,
            padding:'8px 16px',
            margin:'0 !important',
        },
        headerSections:{
            display:'flex',
            justifyContent:'center',
        }
    })
)

const Folder = ({tasks, loading, error, selectedFolder, team, getTasks, updateTask, createTask, deleteTask, getFolderTeam}: any) => {
    const theme= useTheme();
    const classes = useStyles(theme);
    const params = useParams();
    const [status, setStatus] = useState(Status.TO_DO);
    const [taskId, setTaskId] = useState<number>();
    const [parentId, setParentId] = useState<number>();
    const [createTaskOpen, setCreateTaskOpen] = useState(false);

    useEffect(()=>{
        getTasks(params.folderId);
        getFolderTeam(params.folderId);
    },[])

    useEffect(()=>{
        console.log(tasks)
    },[tasks])

    useEffect(()=>{console.log(taskId)},[taskId])
    const changeTab = (event: React.SyntheticEvent, newValue: Status) => {
        setStatus(newValue);
    }

    const onUpdateTask = (data:any) => {
        updateTask({...data, folderId: params.folderId });
    }

    const onCreateTask = (data:any) => {
        createTask({...data, folderId: params.folderId});
        setCreateTaskOpen(false);
    }

    const onDeleteTask = (taskId: number) => {
        deleteTask(taskId, params.folderId);
        setTaskId(undefined);
    }

    const onChangeTask = (id: number) => {
        setTaskId(undefined);
        setTaskId(id);
    }

    const onOpenCreateSubtask=()=>{
        setParentId(taskId);
        setTaskId(undefined);
        setCreateTaskOpen(true);
    }

    const onCloseCreate=()=>{
        setParentId(undefined);
        setTaskId(undefined);
        setCreateTaskOpen(false);
    }
    

    return(
        <>
            <Container className={classes.container}>
                <div className={classes.titleContainer}>
                    <Typography variant='h5'>{selectedFolder?.name}</Typography>
                    
                </div>
                <div className={classes.headerContainer}>
                    <Tabs classes={{root: classes.tabsContainer, flexContainer: classes.tabsFlex}} value={status} onChange={changeTab}>
                        {Object.keys(Status).map((key: any) => (
                            <Tab label={(Status as any)[key]} value={(Status as any)[key]} className={status === (Status as any)[key]? classes.tabSelected : classes.tab} />
                        ))}
                    </Tabs>
                    <IconButton onClick={setCreateTaskOpen.bind(null, true)}>
                        <AddOutlined sx={{fontSize:'1.2rem', color: theme.palette.info.main}}/>
                    </IconButton>
                </div>
                <Card className={classes.card}>
                    <Grid container spacing={1} className={classes.header}>
                        <Grid item xs={2} md={1}>
                            <Typography variant="body2" className={classes.headerSections}>Priority</Typography>
                        </Grid>
                        <Grid item xs={2} md={1}>
                            <Typography variant="body2" className={classes.headerSections}>Assignee</Typography>
                        </Grid> 
                        <Grid item xs={2} md={1}>
                            <Typography variant="body2" className={classes.headerSections}>Due date</Typography>
                        </Grid>
                    </Grid>
                    {tasks && 
                        tasks[Object.keys(Status)[Object.values(Status).indexOf(status)]]?.map((task: any)=>(
                            <TaskRow task={task} key={task.id} clickTask={setTaskId}/>
                        ))
                    }
                </Card>
            </Container>
            {taskId &&
                <TaskModal open={true} onClose={setTaskId.bind(null,undefined)} taskId={taskId} submit={onUpdateTask} deleteTask={onDeleteTask} changeTask={onChangeTask} openCreateSubtask={onOpenCreateSubtask}/>
            }
            {createTaskOpen &&
                <TaskModal open={true} onClose={onCloseCreate} editable={true} submit={onCreateTask} parent={parentId}/>

            }
                <SetAssigneeModal teamId={team? team : 2}/>
            
            
            
        </>
    )
}

export default Folder;