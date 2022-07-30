import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Role } from "../utils/role";
import ConfirmationModal from "./ConfirmModal";
import NameModal from "./NameModal";

const useStyles =  makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display:'flex',
            // alignItems:'center',
            padding:'8px 1rem',
           '&:hover':{
               backgroundColor: theme.palette.primary.main
           } 
        },
        buttonContainer:{
            display:'flex',
            justifyContent: 'end',
            alignItems:'center',
        },
        menuButton: {
            padding: '0 !important',
        },
        name:{
            display:'flex',
            justifyContent: 'start',
            alignItems:'center'
        },
        nameText:{
            cursor: 'pointer'
        },
        menuItem:{
            display:'flex',
            alignItems:'center',
        },
        menuItemDelete:{
            display:'flex',
            alignItems:'center',
            color: `${theme.palette.error.main} !important`,
        }
    })
)

const SpaceRow = ({space, role, editSpace, deleteSpace}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditSpaceOpen, setIsEditSpaceOpen] = useState(false);
    const [isDeleteSpaceOpen, setIsDeleteSpaceOpen] = useState(false);
    const navigate = useNavigate();

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const onEdit = (data:any) => {
        const payload = {
            ...data,
            spaceId: space.id
        }

        editSpace(payload);
        setIsEditSpaceOpen(false);
    }

    const openEdit = (event: any) => {
        event.stopPropagation();
        setIsEditSpaceOpen(true);
    }

    const openDelete = (event: any) => {
        event.stopPropagation();
        setIsDeleteSpaceOpen(true);
    }

    const accessSpace = () => {
        navigate(`space/${space.id}`)
    } 

    return(
        <>
            <Grid container spacing={0} className={classes.container}>
                <Grid item xs={10} className={classes.name}>
                   <Typography variant='body1' className={classes.nameText} onClick={accessSpace}>{space.name}</Typography> 
                </Grid>
                {[Role.Owner.valueOf(), Role.Admin.valueOf()].includes(role) &&
                <Grid item xs={2} className={classes.buttonContainer}>
                    <IconButton onClick={openMenu} className={classes.menuButton}>
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
                        <MenuItem className={classes.menuItem} onClick={openEdit}><Edit sx={{fontSize:18}}/> Edit space</MenuItem>
                        <MenuItem className={classes.menuItemDelete} onClick={openDelete}><Delete sx={{fontSize:18}}/> Delete space</MenuItem>
                    </Menu>
                </Grid>
                }
            </Grid>
            <NameModal
                submit={onEdit}
                open={isEditSpaceOpen}
                onClose={setIsEditSpaceOpen.bind(null,false)}
                title='Edit Space'
                description='Please provide the new name'
            />
             <ConfirmationModal
                onConfirm={deleteSpace.bind(null, space.id)}
                title='Delete space'
                description={`Are you sure you want to delete ${space.name}?`}
                open={isDeleteSpaceOpen}
                onClose={setIsDeleteSpaceOpen.bind(null, false)}
            />
        </>
    )
}

export default SpaceRow;