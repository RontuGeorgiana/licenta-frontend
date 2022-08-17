import { AddOutlined } from "@mui/icons-material"
import { Box, Card, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Theme, Typography, useTheme } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useEffect, useState } from "react"
import CreateEvent from "../containers/createEvent.container"
import { EventIcons, EventType } from "../utils/eventType"
import { formatDate } from "../utils/utils"

const useStyles=makeStyles((theme: Theme) => 
    createStyles({
        container: {
            display:'flex',
            // alignItems:'center',
            padding:'8px 1rem',
           '&:hover':{
               backgroundColor: theme.palette.primary.main
           } 
        },
        rowDetails:{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
        },
        titleContainer:{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            width:'100%'
        },
        datePickerContainer:{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent:'center'
        },
        datePicker:{
            borderRadius: '4px',
            border: `1px solid ${theme.palette.info.light}`,
            outline: 'none !important',
            minWidth: '0 !important',
            padding: '4px 8px !important',
            width:'60% !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        },
        selectContainer:{
            display: 'flex',
            justifyContent:'start',
            alignItems:'center',
            marginRight: '1rem'
        },
        filterLabel:{
            color: `${theme.palette.text.primary} !important`,
            marginRight: '4px',
            fontWeight: '400 !important',
            fontSize: '0.875rem !important'
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
        adornment:{
            padding: '0!important',
            margin: '0!important'
        }
    })
)

const EventRow = ({event, selectEvent}:any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const onSelectEvent = () => {
        selectEvent(event.id);
    }

    return(
        <Grid container className={classes.container}>
            <Grid xs={7}>
                <Typography variant='body1' onClick={onSelectEvent}>{event.name}</Typography>
            </Grid>
            <Grid xs={5} className={classes.rowDetails}>
                {
                    formatDate(event.start)
                }
            </Grid>
        </Grid>
        
    )
}

const EventList = ({teamId, events, getEvents, selectEvent}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [eventType, setEventType] = useState(null);
    const [createEventOpen, setCreateEventOpen] = useState(false);

    useEffect(()=>{
        let filters: any = {};

        if(startDate!==null){
            filters['start'] = startDate;
        }

        if(endDate!==null){
            filters['end'] = endDate;
        }

        if(eventType!==null){
            filters['type'] = eventType;
        }

        getEvents(teamId, filters);
    },[])

    useEffect(()=>{
        console.log(eventType)
        let filters: any = {};

        if(startDate!==null){
            filters['start'] = startDate?.toISOString();
        }

        if(endDate!==null){
            filters['end'] = endDate?.toISOString();
        }

        if(eventType!==null){
            filters['type'] = eventType;
        }

        getEvents(teamId, filters);
    },[startDate, endDate, eventType])

    const onSelectType = (e: any) => {
        setEventType(e.target.value)
    }

    return(
        <>
            <div  className={classes.titleContainer}>
                        <Typography variant='h6'>Events</Typography>
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                        >
                            <DatePicker
                            value={startDate}
                            onChange={(newValue: any) => {
                                setStartDate(newValue);
                            }}
                            InputAdornmentProps={{position:'end', classes:{root: classes.adornment}}}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box className={classes.datePickerContainer}>
                                    <input ref={inputRef} {...inputProps} placeholder='Start date' className={classes.datePicker}/>
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                        >
                            <DatePicker
                            value={endDate}
                            onChange={(newValue: any) => {
                                setEndDate(newValue);
                            }}
                            InputAdornmentProps={{position:'end', classes:{root: classes.adornment}}}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box className={classes.datePickerContainer}>
                                    <input ref={inputRef} {...inputProps} placeholder='End date' className={classes.datePicker}/>
                                    {InputProps?.endAdornment}
                                </Box>
                            )}
                            />
                        </LocalizationProvider>
                        <div className={classes.selectContainer}>
                            <InputLabel className={classes.filterLabel} id='typeSelectLabel'>Task type</InputLabel>
                            <Select labelId='typeSelectLabel' classes={{select: classes.select}} placeholder='Task type' onChange={onSelectType}>
                                <MenuItem value={''}>---</MenuItem>
                                {Object.values(EventType).map((type: any)=>
                                    <MenuItem value={type} key={`option${type}`}>{(EventIcons as any)[type]}{type}</MenuItem>
                                )}
                            </Select> 
                        </div>
                        <IconButton onClick={setCreateEventOpen.bind(null, true)}>
                            <AddOutlined />
                        </IconButton>
                    </div>
            <Card>
                <Stack>
                {events?.map((event:any)=>
                    <EventRow event={event} selectEvent={selectEvent}/>
                ) }
                </Stack>
            </Card>
            {createEventOpen &&
            <CreateEvent onClose={setCreateEventOpen.bind(null, false)} teamId={teamId}/>
            }
        </>
        

    )
}

export default EventList