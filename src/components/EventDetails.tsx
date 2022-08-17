import { Close, Delete } from "@mui/icons-material";
import { Avatar, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { formatDate, getInitials } from "../utils/utils";
import ConfirmationModal from "./ConfirmModal";

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
        detailsRow: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between',
            width:'100%',
            marginBottom:'1rem'
        },
        h100:{
            height:'100%'
        },
        divider:{
            display: "flex",
            alignItems: 'start',
            justifyContent: 'center',
            width:'100%',
        },
        assigneeRow:{
            display:'flex',
            justifyContent:'start',
            alignItems:'center',
            width:'100%',
            padding:'8px 0'
        },
        assigneeAvatar:{
            backgroundColor: `${theme.palette.secondary.light} !important`,
            color: theme.palette.secondary.contrastText,
            width: '1.5rem !important',
            height: '1.5rem !important',
            fontSize: '0.85rem !important',
            marginRight: '4px'
        },

    })
)

const Participant = ({participant}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return(
        <div className={classes.assigneeRow}>
            <Avatar className={classes.assigneeAvatar}>{getInitials(`${participant?.firstName} ${participant?.lastName}`)}</Avatar>
            <Typography variant='body2' component='span'>{`${participant?.firstName} ${participant?.lastName}`}</Typography>
        </div>
    )
}

const EventDetails = ({eventId, teamId, onClose, event, getEvent, deleteEvent}:any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [deleteOpen, setDeleteOpen] = useState(false);

    useEffect(()=>{
        getEvent(eventId, teamId);
    },[])

    const onDeleteEvent = () =>{
        deleteEvent(eventId, teamId);
        onClose();
    }

    return(
        <>
        <Dialog open={true} classes={{paper: classes.dialog}}>
            <DialogTitle className={classes.dialogTitle}>
                <IconButton onClick={onClose}>
                    <Close  fontSize='small'/>
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Grid container className={classes.h100}>
                        <Grid item xs={6}>
                            <div className={classes.detailsRow}>
                                <Typography variant='h5'>{event?.name}</Typography>
                            </div>
                            <div className={classes.detailsRow} style={{flexDirection: 'column', alignItems: 'start'}}>
                                <Typography variant='body2'>Description: </Typography>
                                <Typography variant='body2'>{event?.description || '---'}</Typography>
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2'>Link: {event?.link || '---'}</Typography>
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2'>Event type: {event?.type}</Typography>
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2'>Start date: {formatDate(event?.start)}</Typography>
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2'>End date: {formatDate(event?.end)}</Typography>
                            </div>
                            <div className={classes.detailsRow}>
                                <Typography variant='body2' component='span'>Organizer: </Typography>
                                <Participant participant={event?.organizer}/>
                            </div>
                        </Grid>
                        <Grid item xs={1} className={classes.divider}>
                            <Divider orientation="vertical" variant="middle" flexItem/>
                        </Grid>
                        <Grid item xs={5}>
                            {event?.deletable &&
                                <div className={classes.detailsRow} style={{justifyContent: 'end'}}>
                                    <IconButton onClick={setDeleteOpen.bind(null,true)}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            }
                            <Typography variant='body1'>Participants:</Typography>
                            {event?.participants? 
                            event?.participants?.map((participant: any) =>
                                <Participant participant={participant}/>
                            )
                            : '---'
                            }
                        </Grid>
                    </Grid>
            </DialogContent>
        </Dialog>
        <ConfirmationModal
            title='Delete event'
            description = 'Are you sure you want to delete this event?'
            open={deleteOpen}
            onClose={setDeleteOpen.bind(null, false)}
            onConfirm = {onDeleteEvent}
        />
        </>
    )
}

export default EventDetails