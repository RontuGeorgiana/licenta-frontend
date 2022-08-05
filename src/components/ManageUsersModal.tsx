import { AddCircleOutline, Check, Close, PersonRemove } from "@mui/icons-material";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, List, ListItem, ListItemAvatar, MenuItem, Select, TextField, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Role } from "../utils/role";
import { addMembershipValidations } from "../utils/validations";
import ConfirmationModal from "./ConfirmModal";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container:{
            padding:'1rem'
        },
        title:{
            padding:'0 !important',
            margin: 0,
            display:'flex',
            justifyContent:'center',
            position: 'relative',
        },
        closeButton:{
            position: 'absolute',
            top: '-8px',
            right: '-8px'
        },
        content:{
            display:'flex',
            flexDirection: 'column',
            justifyContent:'center',
            padding: '0 !important',
        },
        list:{
            minWidth:'300px',
        },
        actions:{
            padding: '0 !important',
            display:'flex !important',
            justifyContent:'space-between !important',
            width: '100%',
        },
        select:{
            paddingTop: '0 !important',
            paddingBottom: '0 !important',
            fontSize: '0.83rem !important'
        },
        selectItem:{
            padding: '0 8px !important',

        },
        formContainer:{
            display: 'flex !important',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
            maxWidth: 'none !important',
        },
        formCard:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            borderRadius:'10px !important',
            boxShadow: `0px 2px 1px -1px ${theme.palette.primary.dark} !important`,
        },
        formDialogContent:{
            display:'flex',
            flexDirection: 'column',
            justifyContent:'center',
            padding: '16px !important'
        },
        form: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
        },
        input:{
            width: '100%',
            height: '3rem',
            display: "block",
        },
        inputRow:{
            width: '100%',
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            marginBottom:"1.5rem"
        },
        addMember:{
            backgroundColor: theme.palette.primary.light,
            cursor: 'pointer'
        },
        
    })
)

const AddMember = ({ open, onClose, addMembership, teamId}:any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const {
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setError,
        reset,
      } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });

      const onSubmit = (data: any) => {
        const payload = {
            ...data,
            teamId
        }
        addMembership(payload);
        onClose(); 
        reset();
      }

    return(
        <Dialog open={open} onClose={onClose} classes={{container: classes.formContainer, paper: classes.formCard}}>
            <DialogTitle className={classes.title}>
                Add member
            </DialogTitle>
            <DialogContent classes={{root: classes.formDialogContent}}>
                <FormControl className={classes.form}>
                    <Controller
                         name='email'
                         control={control}
                         rules={addMembershipValidations.email}
                         render={({ field: { onChange, value } }) => {
                             return (
                                 <div className={classes.inputRow}>
                                 <TextField
                                     fullWidth
                                     onChange={onChange}
                                     value={value || ""}
                                     variant='outlined'
                                     size='small'
                                     className={ classes.input }
                                     label='Email'
                                     error={errors['email'] && true}
                                     helperText = {<>{errors['email']?.message}</>}
                                 />
                                 </div>
                             )
                         }}
                    />
                    <Controller
                         name='role'
                         control={control}
                         rules={addMembershipValidations.role}
                         render={({ field: { onChange, value } }) => {
                             return (
                                 <div className={classes.inputRow}>
                                 <Select
                                     fullWidth
                                     onChange={onChange}
                                     value={value || ""}
                                     variant='outlined'
                                     size='small'
                                     className={ classes.input }
                                     label='Role'
                                     defaultValue={Role.User.valueOf()}
                                     error={errors['role'] && true}
                                 >
                                    {Object.keys(Role).map((key) => {
                                        return(
                                            <MenuItem value={(Role as any)[key]} className={classes.selectItem} key={key}><Typography variant='body2'>{key}</Typography></MenuItem>
                                        )
                                    })
                                    }
                                 </Select>
                                 <Typography variant='caption' color='error'>{errors['role']?.message as any}</Typography>
                                 </div>
                             )
                         }}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button color='info' onClick={onClose}>Cancel</Button>
                <Button variant='contained' color='secondary' onClick={handleSubmit(onSubmit)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

const MemberItem = ({member, updateMembership, setToDelete}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [edited, setEdited]=useState(false);
    const [role, setRole] = useState<Role>(member?.role);

    const onChangeRole = (e: any) => {
        setEdited(true);
        setRole(e.target.value);
    }

    const onConfirmChange = () => {
        setEdited(false);
        updateMembership({
            teamId: member.teamid,
            userId: member.userid,
            role
        });
    }

    return(
        <ListItem
            secondaryAction={
                <span>
                     <IconButton onClick={setToDelete.bind(null, member)}>
                        <PersonRemove color="error" />
                    </IconButton>
                    {edited &&
                        <IconButton onClick={onConfirmChange}>
                            <Check color="success"/>
                        </IconButton>
                    }
                </span>                     
            }
            key={`member${member.id}`}
        >
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>{`${member?.firstname[0]}${member?.lastname[0]}`}</Avatar>
            </ListItemAvatar>
                <span>
                    <Typography variant="body2">{`${member?.firstname} ${member?.lastname}`}</Typography>
                    <Select variant='standard' classes={{select: classes.select}} defaultValue={member?.role} onChange={onChangeRole}>
                        {Object.keys(Role).map((key) => {
                            return(
                                <MenuItem value={(Role as any)[key]} className={classes.selectItem} key={key}><Typography variant='body2'>{key}</Typography></MenuItem>
                            )
                        })
                        }
                    </Select>
                </span>
        </ListItem>
    )
}

const ManageUsersModal = ({open, onClose, teamId, memberships, getMemberships, updateMembership, addMembership, deleteMembership, error, isLoading}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<any>(null);

    useEffect(()=>{
        getMemberships(teamId);
    },[])


    const deleteMember = () => {
        deleteMembership(memberToDelete);
        setMemberToDelete(null);
    }

    return(
        <>
        <Dialog open={open} classes={{paper: classes.container}}>
            <DialogTitle className={classes.title}>
                Manage members
                <IconButton
                    className={classes.closeButton}
                    sx={{position: 'absolute'}}
                    onClick={onClose}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent classes={{root: classes.content}}>
                <List className={classes.list}>
                {memberships?.map((user :any, index: number)=>{
                    return(
                        <MemberItem member={user} updateMembership={updateMembership} setToDelete={setMemberToDelete} key={index}/>
                            
                    )
                })
                }
                <ListItem 
                onClick={setAddMemberOpen.bind(null,true)} 
                className={classes.addMember} 
                secondaryAction={
                    <AddCircleOutline/>
                }
                >
                    <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.light }}></Avatar>
                    </ListItemAvatar>
                    <Typography variant="body2">Add member</Typography>
                </ListItem>
                </List>
            </DialogContent>
        </Dialog>
        <AddMember open={addMemberOpen} onClose={setAddMemberOpen.bind(null,false)} addMembership={addMembership} teamId={teamId}/>
        <ConfirmationModal 
        open={memberToDelete!==null} 
        onClose={setMemberToDelete.bind(null, null)} 
        title='Delete member' 
        description={`Are you sure you want to remove ${memberToDelete?.firstname} ${memberToDelete?.lastname} from team?`}
        onConfirm={deleteMember}
        />
        </>
    )
}

export default ManageUsersModal;