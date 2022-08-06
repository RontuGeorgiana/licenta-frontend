import { Close, Search } from "@mui/icons-material"
import { Avatar, Dialog, DialogActions, DialogContent, IconButton, TextField, Theme, Typography, useTheme } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import { useEffect, useState } from "react"
import { getInitials } from "../utils/utils"

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        dialog:{
            width: '50% !important'
        },
        dialogContent:{
            paddingTop:'8px !important'
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
        assigneeRow:{
            display:'flex',
            justifyContent:'start',
            alignItems:'center',
            borderBottom:`1px solid ${theme.palette.info.light}`,
            width:'100%',
            padding:'8px 0'
        },
        textBox: {
            padding: '4px 8px !important',
            WebkitTextFillColor: `${theme.palette.text.primary} !important`,
        },
        
    })
)

const AssigneeRow = ({membership}:any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return(
        <div className={classes.assigneeRow}>
            <Avatar className={classes.assigneeAvatar}>{getInitials(`${membership?.firstname} ${membership?.lastname}`)}</Avatar>
            <Typography variant='body2' component='span'>{`${membership?.firstname} ${membership?.lastname}`}</Typography>
        </div>
    )
}

const SetAssigneeModal = ({teamId, search, memberships, getMemberships, onSearchMembership}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [searchString, setSearchString] = useState<string>('');

    useEffect(()=>{
        getMemberships(teamId)
    },[])

    useEffect(()=>{
        if(searchString !== ''){
            getMemberships(teamId, searchString)
        }
        
    },[searchString])



    return(
        <Dialog open={true} classes={{paper: classes.dialog}}>
            <DialogActions>
                <IconButton>
                    <Close/>
                </IconButton>
            </DialogActions>
            <DialogContent className={classes.dialogContent}>
                <TextField 
                    placeholder='Search assignee'
                    className={classes.w100}
                    inputProps={{className: classes.textBox}}
                    InputProps={{endAdornment: <Search/>}}
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
                {memberships && memberships.length>0 &&
                    memberships.map((membership: any) =>
                        <AssigneeRow membership={membership}/> 
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default SetAssigneeModal