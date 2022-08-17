import { Check, Close } from "@mui/icons-material"
import { Card, Grid, IconButton, Stack, Theme, Typography, useTheme } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import { useEffect } from "react"

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container: {
            display:'flex',
            // alignItems:'center',
            padding:'8px 1rem',
           '&:hover':{
               backgroundColor: theme.palette.primary.main
           } 
        },
        eventName:{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center'
        },
        rowDetails:{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
        },
        eventActions:{
            padding:'0 4px !important'
        },
        titleContainer:{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            width:'100%'
        },

    })
)

const EventRow = ({event, resolve}: any) =>{
    const theme = useTheme();
    const classes = useStyles(theme);

    const onApprove = () => {
        resolve(event.id, true);
    }

    const onReject = () => {
        resolve(event.id, false);
    }

    return(
        <Grid container className={classes.container}>
            <Grid xs={7} className={classes.eventName}>
                <Typography variant='body1'>{event?.name}</Typography>
            </Grid>
            <Grid xs={5} className={classes.rowDetails}>
                <IconButton className={classes.eventActions} onClick={onApprove}>
                    <Check color='success'/>
                </IconButton>
                <IconButton className={classes.eventActions} onClick={onReject}>
                    <Close color='error'/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

const PendingEventsList = ({teamId, events, getPendingEvents, resolveEvent}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    useEffect(()=> {
        console.log(teamId)
        getPendingEvents(teamId);
    },[])

    const onResolve = (eventId: number, approved: boolean) => {
        const payload={
            eventId,
            approved,
            teamId
        }
        resolveEvent(payload);
    }

    return(
        <>
        <div  className={classes.titleContainer}>
            <Typography variant='h6'>Pending events</Typography>
        </div>
        <Card>
            <Stack>
            {events?.length>0 ?
                events?.map((event:any)=>
                    <EventRow event={event} resolve={onResolve}/>
                ) :
                'No pending events'
            }
            </Stack>
        </Card>
        </>
    )
}

export default PendingEventsList