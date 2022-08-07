import { Close, Search } from "@mui/icons-material"
import { Avatar, Dialog, DialogActions, DialogContent, IconButton, TextField, Theme, Typography, useTheme } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles"
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react"
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

const AssigneeRow = ({membership, assign}:any) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const onAssign = () => {
        assign(membership.userid);
    }

    return(
        <div className={classes.assigneeRow} onClick={onAssign}>
            <Avatar className={classes.assigneeAvatar}>{getInitials(`${membership?.firstname} ${membership?.lastname}`)}</Avatar>
            <Typography variant='body2' component='span'>{`${membership?.firstname} ${membership?.lastname}`}</Typography>
        </div>
    )
}

const SetAssigneeModal = ({onClose, teamId, memberships, getMemberships, updateTaskAssignee}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [searchString, setSearchString] = useState<string>('');

    useEffect(()=>{
        getMemberships(teamId)
    },[])

    useEffect(()=>{
        getMemberships(teamId, searchString)
    },[searchString])

    const debounceSetSearch = useCallback(debounce((search) => setSearchString(search), 250, {trailing:true}), [])

    const handleChange = (e: any) =>{
        debounceSetSearch(e.target.value);
    }

    const onSelectMembership = (userId: number) => {
        const data = {
            asignee: userId
        }
        updateTaskAssignee(data);
        onClose();
    }
    return(
        <Dialog open={true} classes={{paper: classes.dialog}}>
            <DialogActions>
                <IconButton>
                    <Close onClick={onClose}/>
                </IconButton>
            </DialogActions>
            <DialogContent className={classes.dialogContent}>
                <TextField 
                    placeholder='Search assignee'
                    defaultValue={''}
                    className={classes.w100}
                    inputProps={{className: classes.textBox}}
                    InputProps={{endAdornment: <Search/>}}
                    onChange={handleChange}
                />
                {memberships && memberships.length>0 &&
                    memberships.map((membership: any) =>
                        <AssigneeRow membership={membership} key={`member${membership.id}`} assign={onSelectMembership}/> 
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default SetAssigneeModal