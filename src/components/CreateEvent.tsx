import { Close, Search } from "@mui/icons-material";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton, Menu, MenuItem, Select, TextField, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { EventIcons, EventType } from "../utils/eventType";
import { getInitials } from "../utils/utils";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        dialog:{
            width:'70% !important',
            maxWidth:'none !important',
            height:'50vh !important',
        },
        dialogTitle:{
            display: "flex !important",
            alignItems: 'center !important',
            justifyContent: 'end !important',
            padding:'16px 16px 0 16px !important'
        },
        dialogContent:{
            height:'80%'
        },
        formControl:{
            height:'90%',
            width: '100%'
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
        scrollableContainer:{
            height:'100%',
            overflowY: 'scroll',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            "&::-webkit-scrollbar": {
                display: 'none'
            }
        },
        assigneeRow:{
            display:'flex',
            justifyContent:'start',
            alignItems:'center',
            borderBottom:`1px solid ${theme.palette.info.light}`,
            width:'100%',
            padding:'8px 0'
        },
        actions:{
            paddingTop: 0,
            display:'flex !important',
            justifyContent:'space-between !important'
        }
    })
)

const AddParticipantRow = ({membership, assign}:any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const onAssign = () => {
        assign(membership);
    }

    return(
        <MenuItem className={classes.assigneeRow} onClick={onAssign}>
            <Avatar className={classes.assigneeAvatar}>{getInitials(`${membership?.firstname} ${membership?.lastname}`)}</Avatar>
            <Typography variant='body2' component='span'>{`${membership?.firstname} ${membership?.lastname}`}</Typography>
        </MenuItem>
    )
}

const ParticipantRow = ({membership, remove}:any)=>{
    const theme = useTheme();
    const classes = useStyles(theme);

    const onRemove = () => {
        remove(membership);
    }

    return(
        <div className={classes.detailsRow}>
            <div className={classes.assigneeRow}>
                <Avatar className={classes.assigneeAvatar}>{getInitials(`${membership?.firstname} ${membership?.lastname}`)}</Avatar>
                <Typography variant='body2' component='span'>{`${membership?.firstname} ${membership?.lastname}`}</Typography>
            </div>
            <IconButton onClick={onRemove}>
                <Close />
            </IconButton>
        </div>
    )
}

const CreateEvent = ({onClose, teamId, memberships, getMemberships, createEvent}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchString, setSearchString] = useState<string>('');
    const [selectedParticipants, setSelectedParticipants] = useState<any[]>([]);

    useEffect(()=>{
        getMemberships(teamId)
    },[])

    useEffect(()=>{
        getMemberships(teamId, searchString)
    },[searchString])

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const openMenu = (target: any) => {
        setAnchorEl(target);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const debounceSetSearch = useCallback(debounce((search:string, target: any) => handleSearchParticipant(search, target), 250, {trailing:true}), [])

    const handleChange = (e: any) =>{
        debounceSetSearch(e.target.value, e?.currentTarget);
    }

    const handleSearchParticipant = (search:string, target: any) =>{
        setSearchString(search);
        openMenu(target);
    }

    const addParticipant = (participant: any) => {
        setSelectedParticipants([...selectedParticipants, participant]);
    }

    const removeParticipant = (participant: any) => {
        setSelectedParticipants(selectedParticipants.filter((p)=> p.id !== participant.id));
    }

    const onSubmit = (data: any) => {
        let payload = {
            ...data,
            start: new Date(data.start).toISOString(),
            end: new Date(data.end).toISOString(),
            teamId
        }
        if(selectedParticipants.length>0){
            payload['participants'] = selectedParticipants.map((participant: any) => participant.userId)
        }

        createEvent(payload);
        onClose()
    }


    return (
        <Dialog open={true} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton onClick={onClose}>
                    <Close  fontSize='small'/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <FormControl className={classes.formControl}>
                    <Grid container className={classes.h100}>
                        <Grid item xs={6}>
                            <div className={classes.detailsRow}>
                                <Controller 
                                    name='name'
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChange={onChange}
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
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            multiline
                                            value={value}
                                            onChange={onChange}
                                            className={classes.w100} 
                                            inputProps={{className: classes.textBox}}
                                            placeholder="Description"
                                            variant="standard"
                                        />
                                    )}
                                />   
                            </div>
                            <div className={classes.detailsRow}>
                                <Controller 
                                    name='link'
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            className={classes.w100} 
                                            inputProps={{className: classes.textBox}}
                                            placeholder="Link"
                                            variant="standard"
                                        />
                                    )}
                                />   
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2' component='span'>Event type:</Typography>
                                <Controller
                                        name='type'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Select 
                                                classes={{select: classes.select}} 
                                                className={classes.w100} 
                                                value={value} 
                                                onChange={onChange}
                                            >
                                                {Object.values(EventType).map((type: any) => 
                                                    <MenuItem value={type}>
                                                        {(EventIcons as any)[type]}
                                                        {type}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        )}
                                    />
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2' component='span'>Start date:</Typography>
                                <LocalizationProvider
                                    dateAdapter={ AdapterDateFns }
                                >
                                    <Controller 
                                        name='start'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                value={value}
                                                onChange={(newValue: any) => {
                                                    onChange(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box className={classes.datePickerContainer}>
                                                    <input ref={inputRef} {...inputProps} className={`${classes.textBox} ${classes.datePicker}`}/>
                                                    {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        )}
                                    />               
                                </LocalizationProvider>
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2' component='span'>End date:</Typography>
                                <LocalizationProvider
                                    dateAdapter={ AdapterDateFns }
                                >
                                    <Controller 
                                        name='end'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                                value={value}
                                                onChange={(newValue: any) => {
                                                    onChange(newValue);
                                                }}
                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box className={classes.datePickerContainer}>
                                                    <input ref={inputRef} {...inputProps} className={`${classes.textBox} ${classes.datePicker}`}/>
                                                    {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        )}
                                    />               
                                </LocalizationProvider>
                            </div>
                        </Grid>
                        <Grid item xs={1} className={classes.divider}>
                            <Divider orientation="vertical" variant="middle" flexItem/>
                        </Grid>
                        <Grid item xs={5}>
                            <div>
                                <TextField 
                                    placeholder='Search participant'
                                    defaultValue={''}
                                    className={classes.w100}
                                    inputProps={{className: classes.textBox}}
                                    InputProps={{endAdornment: <Search/>}}
                                    onChange={handleChange}
                                />
                                <Menu 
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                    }}
                                    // classes={{paper: classes.w100}}
                                    open={Boolean(anchorEl)}
                                    onClose={closeMenu}
                                >
                                  {memberships?.map((member: any)=> 
                                    <AddParticipantRow membership={member} assign={addParticipant}/>
                                  )

                                  }  
                                </Menu>
                            </div>
                            <div className={classes.scrollableContainer}>
                                {selectedParticipants.length > 0 &&
                                    selectedParticipants.map((participant: any) => 
                                        <ParticipantRow membership={participant} remove={removeParticipant}/>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                </FormControl>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button color='info' onClick={onClose}>Cancel</Button>
                <Button color='secondary' variant='contained' onClick={handleSubmit(onSubmit)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateEvent