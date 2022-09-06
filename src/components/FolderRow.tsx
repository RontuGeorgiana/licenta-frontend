import { AddOutlined, Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Menu, MenuItem, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from "./ConfirmModal";
import NameModal from "./NameModal";

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        accordion:{
            boxShadow: 'none !important'
        },
        titleContainer:{
            minHeight:'30px !important',
            borderBottom:`1px solid ${theme.palette.primary.light} !important`,
            padding: '0 4px !important',
            background: theme.palette.background.default 
        },
        accordionTitle:{
            // display: 'flex',
            // justifyContent:'space-between',
            // alignItems: 'center',
            padding:'8px 0px !important',
            margin:'0px !important',
        },
        accordionDetails:{
            padding:' 0 0 0 4px !important',
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
        buttonContainer:{
            display:'flex',
            justifyContent: 'end',
            alignItems:'center',
        },
        name:{
            display:'flex',
            justifyContent: 'start',
            alignItems:'center'
        },
        rowContainer:{
            background: theme.palette.background.default,
            padding:'0 4px',
            cursor: 'pointer'
        }
    })
)

const FolderRow = ({folder, teamId, selectFolder, editFolder, deleteFolder, createFolder}:any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [anchorEl, setAnchorEl] =useState<null | HTMLElement>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event?.currentTarget);
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const onSelectFolder = (event: any) => {
        event.stopPropagation();
        selectFolder(folder);
        navigate(`/space/${params.spaceId}/folder/${folder.id}`)
    }

    const openEdit = (event: any) => {
        event.stopPropagation();
        setEditOpen(true);
    }

    const onEditFolder = (data: any) =>{
        const payload = {
            id: folder.id,
            name: data.name,
        };
        editFolder(payload, params.spaceId);
        setEditOpen(false);
    }

    const openDelete = (event: any) => {
        event.stopPropagation();
        setDeleteOpen(true);
    }

    const onDelete = () => {
        deleteFolder(folder.id, params.spaceId);
        setDeleteOpen(false);
    } 

    const openCreate = (event: any) => {
        event.stopPropagation();
        setCreateOpen(true);
    }

    const onCreateFolder = (data: any) =>{
        const payload = {
            name: data.name,
            parentId: folder.id,
            spaceId: params.spaceId,
            teamId
        };
        createFolder(payload);
        setCreateOpen(false);
    }

    return(<>
        {folder.children !== null && folder?.children?.length > 0  && 
                <Accordion className={classes.accordion}>
                    <AccordionSummary classes={{root: classes.titleContainer, content: classes.accordionTitle}}>
                        <Grid container spacing={0}>
                            <Grid item xs={10} className={classes.name}>
                                <Typography onClick={onSelectFolder}>{folder?.name}</Typography>
                            </Grid>
                            <Grid item xs={2} className={classes.buttonContainer}>
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
                                    <MenuItem className={classes.menuItem} onClick={openCreate}><AddOutlined sx={{fontSize:18}}/>Add folder</MenuItem>
                                    <MenuItem className={classes.menuItem} onClick={openEdit}><Edit sx={{fontSize:18}}/>Rename folder</MenuItem>
                                    <MenuItem className={classes.menuItemDelete} onClick={openDelete}><Delete sx={{fontSize:18}}/>Delete folder</MenuItem>
                                </Menu>
                                </div>
                            </Grid>
                        </Grid>
                        
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        {folder.children && 
                            folder.children.map((child: any)=>
                                <FolderRow folder={child} selectFolder={selectFolder} editFolder={editFolder} deleteFolder={deleteFolder} createFolder={createFolder} key={`child${child.id}`}/>
                            )

                        }
                    </AccordionDetails>
                </Accordion>
        }
        {folder.children === null || folder.children.length === 0 &&
            <Grid container spacing={0} className={classes.rowContainer}>
                <Grid item xs={10} className={classes.name}>
                    <Typography onClick={onSelectFolder}>{folder?.name}</Typography>
                </Grid>
                <Grid item xs={2} className={classes.buttonContainer}>
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
                            <MenuItem className={classes.menuItem} onClick={openCreate}><AddOutlined sx={{fontSize:18}}/>Add folder</MenuItem>
                            <MenuItem className={classes.menuItem} onClick={openEdit}><Edit sx={{fontSize:18}}/>Rename folder</MenuItem>
                            <MenuItem className={classes.menuItemDelete} onClick={openDelete}><Delete sx={{fontSize:18}}/>Delete folder</MenuItem>
                        </Menu>
                </Grid>
            </Grid>
        }
        <NameModal
            open={editOpen}
            onClose={setEditOpen.bind(null,false)}
            title='Change folder name'
            description='Enter new name'
            submit={onEditFolder}
        />
        <ConfirmationModal
            open={deleteOpen}
            onClose={setDeleteOpen.bind(null,false)}
            title='Delete folder'
            description={`Are you sure you want to delete ${folder.name}?`}
            onConfirm={onDelete}
        />
        <NameModal
            open={createOpen}
            onClose={setCreateOpen.bind(null, false)}
            title='Create folder'
            description='Create child folder'
            submit={onCreateFolder}
        />
    </>    
    )
} 

export default FolderRow