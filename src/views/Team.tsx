import { Card, Container, Grid, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import EventDetails from "../containers/eventDetails.container";
import EventList from "../containers/eventList.container";
import PendingEventsList from "../containers/pendingEventsList.container";
import SpaceRow from "../containers/spaceRow.container";
import { Role } from "../utils/role";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        titleContainer:{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            width:'100%'
        },
    })
)

const Team = ({team, getTeam}: any) => {
    const params = useParams();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [eventType, setEventType] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
    

    useEffect(()=>{
        getTeam(params.teamId)
    },[])


    const onSelectType = (e: any) => {
        setEventType(e.target.value)
    }

    return(
        <>
        <Container>
            <div className={classes.titleContainer}>
                <Typography variant='h5'>{team?.name}</Typography>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div className={classes.titleContainer}>
                    <Typography variant='h6'>Spaces</Typography>
                    </div>
                    <Card >
                        {team?.spaces.map((space:any)=>
                            <SpaceRow space={space} role={team?.role} absoluteRoutes={true}/>
                        )
                        }
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    {[Role.Admin.valueOf(), Role.Owner.valueOf()].includes(team?.role) &&
                        <PendingEventsList teamId={params.teamId}/>
                    }
                    
                </Grid>
                <Grid item xs={12}>
                    <EventList teamId={params.teamId} selectEvent={setSelectedEvent}/>
                </Grid>
            </Grid>
        </Container>
        {selectedEvent !== null &&
            <EventDetails eventId={selectedEvent} teamId={team?.id} onClose={setSelectedEvent.bind(null, null)}/>
        }
        
        </>
        
    )
}

export default Team