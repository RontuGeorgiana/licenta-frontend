import { AddOutlined, PeopleOutlined, PersonOutlined, Search } from "@mui/icons-material";
import { Card, Container, Grid, IconButton, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Theme, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import TaskModal from "../containers/taskModal.container";
import TaskRow from "../containers/taskRow.container";
import { numberToPriority, PriorityIcons } from "../utils/priority";
import { Status } from "../utils/status";
import { Type, TypeIcons } from "../utils/type";

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
        },
        w100:{
            width: '100% !important'
        },
        filtersContainer:{
            display: 'flex',
            justifyContent: "start",
            alignItems: 'end',
            width:'100%',
        },
        textBox: {
            padding: '4px 8px !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        },
        searchContainer:{
            display: 'flex',
            justifyContent:'start',
            alignItems:'center',
            marginRight: '1rem'
        },
        toggleButton:{
            padding: '4px 8px !important',
            boxShadow: 'none !important',
        },
        select:{
            padding:'4px 16px 4px 8px !important',
            minWidth: '75px !important',
            marginRight: '14px !important',
            width: '100% !important',
            display: 'flex !important',
            alignItems: 'center',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        },
        filterLabel:{
            color: `${theme.palette.text.primary} !important`,
            marginRight: '4px'
        }
    })
)

//TODO filter bar for tasks
const Folder = ({tasks, loading, error, selectedFolder, team, getTasks, updateTask, createTask, deleteTask, getFolderTeam}: any) => {
    const theme= useTheme();
    const classes = useStyles(theme);
    const params = useParams();
    const [status, setStatus] = useState(Status.TO_DO);
    const [taskId, setTaskId] = useState<number>();
    const [parentId, setParentId] = useState<number>();
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [taskType, setTaskType] = useState('');
    const [taskPriority, setTaskPriority] = useState(0);
    const [taskAssignee, setTaskAssignee] = useState('');

    useEffect(()=>{
        let filters :any = {
            search: searchString, 
        }
        if(taskType!==''){
            filters['type']=taskType;
        }
        if(taskPriority!==0){
            filters['priority']=taskPriority;
        }
        if(taskAssignee!==''){
            filters['assignee']=taskAssignee;
        }
        
        getTasks(params.folderId, filters);
    },[])

    useEffect(()=>{
        let filters :any = {
            search: searchString, 
        }
        if(taskType!==''){
            filters['type']=taskType;
        }
        if(taskPriority!==0){
            filters['priority']=taskPriority;
        }
        if(taskAssignee!==''){
            filters['assignee']=taskAssignee;
        }
        
        getTasks(params.folderId, filters);
    },[searchString, taskType, taskPriority, taskAssignee])

    useEffect(()=>{
    },[tasks])

    const changeTab = (event: React.SyntheticEvent, newValue: Status) => {
        setStatus(newValue);
    }

    const onUpdateTask = (data:any) => {
        updateTask({...data, folderId: params.folderId, teamId: tasks.teamId });
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

    const debounceSetSearch = useCallback(debounce((search: string) => setSearchString(search), 250, {trailing:true}), [])

    const handleChange = (e: any) =>{
        debounceSetSearch(e.target.value);
    }

    const onSelectType=(e: any) => {
        setTaskType(e.target.value)
    }

    const onSelectPriority=(e: any) => {
        setTaskPriority(e.target.value)
    }

    const handleChangeAssignee=(event: React.MouseEvent<HTMLElement>,
        newAssignee: string,
      ) => {
        setTaskAssignee(newAssignee);
      };

    return(
        <>
            <Container className={classes.container}>
                <div className={classes.titleContainer}>
                    <Typography variant='h5'>{selectedFolder?.name}</Typography>
                    
                </div>
                <div className={classes.filtersContainer}>
                    <div className={classes.searchContainer}>
                      <TextField 
                        placeholder='Search task'
                        defaultValue={''}
                        className={classes.w100}
                        inputProps={{className: classes.textBox}}
                        onChange={handleChange}
                        InputProps={{endAdornment: <Search color='info'/>}}
                        />
                    </div>
                    <div className={classes.searchContainer}>
                        <InputLabel className={classes.filterLabel} id='typeSelectLabel'>Task type</InputLabel>
                        <Select labelId='typeSelectLabel' classes={{select: classes.select}} placeholder='Task type' onChange={onSelectType}>
                            <MenuItem value={''}>---</MenuItem>
                            {Object.values(Type).map((type: any)=>
                                <MenuItem value={type} key={`option${type}`}>{(TypeIcons as any)[type]}{type}</MenuItem>
                            )}
                        </Select> 
                    </div>
                    <div className={classes.searchContainer}>
                        <InputLabel className={classes.filterLabel} id='prioritySelectLabel'>Task priority</InputLabel>
                        <Select labelId='prioritySelectLabel' classes={{select: classes.select}} placeholder='Task priority' onChange={onSelectPriority}>
                            <MenuItem value={0}>---</MenuItem>
                            {Object.keys(numberToPriority).map((priority: any)=>
                                <MenuItem value={priority} key={`option${priority}`}>{(PriorityIcons as any)[(numberToPriority as any)[priority]]}{(numberToPriority as any)[priority]}</MenuItem>
                            )}
                        </Select> 
                    </div>
                    <ToggleButtonGroup value={taskAssignee} onChange={handleChangeAssignee} exclusive>
                        <ToggleButton value='me' className={classes.toggleButton}>
                            <PersonOutlined sx={{fontSize: 19}}/>
                        </ToggleButton>
                        <ToggleButton value='' className={classes.toggleButton}>
                            <PeopleOutlined sx={{fontSize: 19}}/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                    
                    
                </div>
                <div className={classes.headerContainer}>
                    <Tabs classes={{root: classes.tabsContainer, flexContainer: classes.tabsFlex}} value={status} onChange={changeTab}>
                        {Object.keys(Status).map((key: any) => (
                            <Tab key={`${key}tab`} label={(Status as any)[key]} value={(Status as any)[key]} className={status === (Status as any)[key]? classes.tabSelected : classes.tab} />
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
                        </Grid>
                    </Grid>
                    {tasks?.taskTree && 
                        tasks?.taskTree[Object.keys(Status)[Object.values(Status).indexOf(status)]]?.map((task: any)=>(
                            <TaskRow task={task} key={task.id} clickTask={setTaskId} teamId={tasks.teamId}/>
                        ))
                    }
                </Card>
            </Container>
            {taskId &&
                <TaskModal open={true} onClose={setTaskId.bind(null,undefined)} taskId={taskId} submit={onUpdateTask} deleteTask={onDeleteTask} changeTask={onChangeTask} openCreateSubtask={onOpenCreateSubtask} teamId={tasks.teamId}/>
            }
            {createTaskOpen &&
                <TaskModal open={true} onClose={onCloseCreate} editable={true} submit={onCreateTask} parent={parentId} teamId={tasks.teamId}/>

            }
            
               
            
            
            
        </>
    )
}

export default Folder;