import { ArrowBackIosNew, MenuOutlined } from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Container, Drawer, IconButton, Menu, MenuItem, Theme, Toolbar, Typography } from "@mui/material";
import { createStyles, makeStyles, useTheme } from '@mui/styles';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import FoldersContainer from '../containers/folderList.container';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        pageContainer: {
            display: 'flex !important',
            flexDirection:'column',
            height: '100vh',
            width: '100% !important',
            maxWidth: 'none !important',
            padding:'100px 10%',
            margin: 0,
        },
        appBar:{
            position: 'fixed',
            top: 0,
            left: 0
        },
        barContent:{
            width: '100%',
            padding: '4px 16px',
            margin:0,
            maxWidth: 'none !important',
        },
        toolbar:{
            minHeight: '46px',
            justifyContent: 'space-between'
        },
        logo:{
            cursor:'pointer', 
            color: theme.palette.secondary.contrastText,
        },
        drawerMenu:{
         background:`${theme.palette.primary.main} !important`,
         width:'175px',
        //  padding:'8px'

        },
        page:{
            // width:'calc(100% - 175px) !important'
            margin: '0 !important',
            padding: '0 !important'
        },
        drawerHeader:{
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            padding: '8px'
        },
        drawerTitle: {
            display:'inline-block'
        },
        divider: {
            margin: 0,
            width: '100%'
        },
        drawerDropdown:{
            boxShadow: 'none !important',
            borderRadius: '0 !important',
            background: `${theme.palette.primary.main} !important`,
            margin: '0 !important',
        },
        drawerDropdownTitle:{
            padding:'0px !important',
            margin:'0px !important',
            minHeight: '0px !important'
        },
        drawerDropdownContent:{
            backgroundColor: theme.palette.primary.main,
            padding:'0px 16px!important',
            borderTop: `1px solid ${theme.palette.secondary.light}`
        },

    })
)

const LayoutWrapper = ({children}: any) => {
    const theme = useTheme();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
    const classes = useStyles(theme);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const {setAuthState} = useAuthContext();
    const params = useParams();
    

    const reroute = (path: string) => {
        navigate(path);
    }

    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event?.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null);
    }

    const logout = () => {
        localStorage.clear();
        setAuthState({isAuthenticated: false});
    }

    return(
        <Container className={classes.pageContainer} style={{alignItems: isDrawerOpen? 'end': 'start'}}>
        <AppBar color="secondary" className={classes.appBar} position='fixed' style={{width: isDrawerOpen? 'calc(100% - 175px)': '100%'}}>
            <Container className={classes.barContent}>
                <Toolbar disableGutters className={classes.toolbar}>
                    {Object.keys(params).length > 0 ? 
                        (isDrawerOpen?
                            <ArrowBackIosNew fontSize="medium" onClick={setIsDrawerOpen.bind(null, !isDrawerOpen)}/>:
                            <MenuOutlined fontSize="medium" onClick={setIsDrawerOpen.bind(null, !isDrawerOpen)}/>
                        ):
                        <StickyNote2OutlinedIcon fontSize="large" className={classes.logo} onClick={reroute.bind(null, '/')}/>
                    }
                    <IconButton onClick={openMenu}>
                        <AccountCircleOutlinedIcon fontSize="large" className={classes.logo}/>
                    </IconButton>
                    <Menu 
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={closeMenu}
                    >
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
        {Object.keys(params).length > 0 &&
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={setIsDrawerOpen.bind(null,false)}
                classes={{paper: classes.drawerMenu}}
                variant='persistent'
            >
                <div className={classes.drawerHeader}>
                    <StickyNote2OutlinedIcon fontSize="medium" onClick={reroute.bind(null, '/')}/>
                    <Typography variant="h6" className={classes.drawerTitle}>STICK TO IT</Typography>
                </div>
                <br/>
                <hr className={classes.divider}/>
                <br/>
                <Accordion className={classes.drawerDropdown}>
                    <AccordionSummary classes={{content: classes.drawerDropdownTitle, root:classes.drawerDropdownTitle}}>Folders</AccordionSummary>
                    <AccordionDetails className={classes.drawerDropdownContent}>
                        <FoldersContainer/>
                    </AccordionDetails>
                </Accordion>
                <hr className={classes.divider}/>
            </Drawer>
        }
        <Container className={classes.page} style={{width: isDrawerOpen? 'calc(100% - 175px)': '100%'}}>
            {children}
        </Container>
        
        </Container>
        
    )
};

export default LayoutWrapper;