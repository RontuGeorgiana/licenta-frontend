import { AddOutlined, Delete, Edit, ExpandMore, Logout, ManageAccounts, MoreHoriz } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Menu, MenuItem, Stack, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ManageUsersModal from "../containers/membersModal.container";
import SpaceRow from "../containers/spaceRow.container";
import { IListSpace } from "../interfaces/space.interface";
import { Role } from "../utils/role";
import ConfirmationModal from "./ConfirmModal";
import NameModal from "./NameModal";

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        titleContainer:{
            minHeight:'30px !important',
            borderBottom:`1px solid ${theme.palette.primary.light}` 
        },
        accordion:{
            boxShadow: 'none !important'
        },
        accordionTitle:{
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'center',
            padding:'8px 0px !important',
            margin:'0px !important',
        },
        accordionContent:{
            padding:'0px !important',
        },
        accordionList:{
            padding:'8px 0px'
        },
        menuItem:{
            display:'flex',
            alignItems:'center',
        },
        menuItemDelete:{
            display:'flex',
            alignItems:'center',
            color: `${theme.palette.error.main} !important`,
        },
        rotated:{
            transform: 'rotate(180deg)'
        }
    })
)

const TeamRow = ({team, editTeam, deleteTeam, addSpace, leaveTeam}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditTeamOpen, setIsEditTeamOpen] = useState(false);
    const [isDeleteTeamOpen, setIsDeleteTeamOpen] = useState(false);
    const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
    const [isLeaveTeamOpen, setIsLeaveTeamOpen] = useState(false);
    const [isAddSpaceOpen, setIsAddSpaceOpen] = useState(false);
    const [isExpanded, setExpanded] = useState(false);

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const onEdit = (data:any) => {
        editTeam(team.id, data.name);
        setIsEditTeamOpen(false);
    }

    const openEdit = (event: any) => {
        event.stopPropagation();
        setIsEditTeamOpen(true);
    }

    const openDelete = (event: any) => {
        event.stopPropagation();
        setIsDeleteTeamOpen(true);
    }

    const openManageUsers = (event: any) => {
        event.stopPropagation();
        setIsManageMembersOpen(true);
    }

    const openLeaveTeam = (event: any) => {
        event.stopPropagation();
        setIsLeaveTeamOpen(true);
    }

    const openAddSpace = (event: any) => {
        event.stopPropagation();
        setIsAddSpaceOpen(true);
    }

    const onAddSpace = (data: any) => {
        const payload = {
            name: data.name,
            teamId: team.id
        }
        addSpace(payload);
        setIsAddSpaceOpen(false);
    }

    const accessTeam= () => {
        navigate(`/team/${team.id}`)
    } 

    return(
        <>
            <Accordion expanded={isExpanded} onChange={setExpanded.bind(null,!isExpanded)} className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMore className={classes.rotated}/>} 
                    classes={{root: classes.titleContainer, content: classes.accordionTitle}}
                    style={{background: `${isExpanded? theme.palette.primary.light : theme.palette.background.default}`}}
                    >
                    <Typography variant='body1' onClick={accessTeam}>{team.name}</Typography>
                    <div>
                        <IconButton onClick={openMenu}>
                            <MoreHoriz/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={closeMenu}
                        >
                            {team.role === Role.Owner &&
                                <MenuItem className={classes.menuItem} onClick={openEdit}><Edit sx={{fontSize:18}}/> Edit team</MenuItem>
                            }
                            {team.role === Role.Owner &&
                                <MenuItem className={classes.menuItemDelete} onClick={openDelete}><Delete sx={{fontSize:18}}/> Delete team</MenuItem>
                            }  
                            {[Role.Owner.valueOf(), Role.Admin.valueOf()].includes(team.role) &&
                                <MenuItem className={classes.menuItem} onClick={openAddSpace}><AddOutlined sx={{fontSize:18}}/> Add space to team</MenuItem>
                            }     
                            {[Role.Owner.valueOf(), Role.Admin.valueOf()].includes(team.role) &&
                                <MenuItem className={classes.menuItem} onClick={openManageUsers}><ManageAccounts sx={{fontSize:18}}/> Manage team members</MenuItem>
                            }
                            <MenuItem className={classes.menuItemDelete} onClick={openLeaveTeam}><Logout sx={{fontSize:18}}/> Leave team</MenuItem>
                        </Menu>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionContent}>
                    <Stack spacing={0} className={classes.accordionList}>
                        {
                            team.spaces.map((space: IListSpace)=>(
                                // <div className={classes.child} key={space.id}><Typography variant='body1'>{space.name}</Typography></div>
                                <SpaceRow space={space} role={team.role} key={space.id}/>
                            ))
                        }
                    </Stack>
                    
                </AccordionDetails>
            </Accordion>
            <NameModal
                submit={onEdit}
                open={isEditTeamOpen}
                onClose={setIsEditTeamOpen.bind(null,false)}
                title='Edit Team'
                description='Please provide the new name'
            />
            <ConfirmationModal
                onConfirm={deleteTeam.bind(null, team.id)}
                title='Delete team'
                description='Are you sure you want to delete this team?'
                open={isDeleteTeamOpen}
                onClose={setIsDeleteTeamOpen.bind(null, false)}
            />
            {isManageMembersOpen && 
                < ManageUsersModal
                open={true}
                onClose={setIsManageMembersOpen.bind(null, false)}
                teamId={team.id}
            />
            }
            <ConfirmationModal
                onConfirm={leaveTeam.bind(null, team.id)}
                title='Leave team'
                description={`Are you sure you want to leave ${team.name}?`}
                open={isLeaveTeamOpen}
                onClose={setIsLeaveTeamOpen.bind(null, false)}
            />
            <NameModal
                submit={onAddSpace}
                open={isAddSpaceOpen}
                onClose={setIsAddSpaceOpen.bind(null,false)}
                title='Add Space'
                description='Please provide a name for the space'
            />
        </>
    )
}

export default TeamRow;