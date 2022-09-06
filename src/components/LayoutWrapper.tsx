import { ArrowBackIosNew, MenuOutlined } from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Avatar, Container, Drawer, IconButton, Menu, MenuItem, Theme, Toolbar, Typography } from "@mui/material";
import { createStyles, makeStyles, useTheme } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import FoldersContainer from '../containers/folderList.container';
import { getInitials } from '../utils/utils';

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
            right: 0
        },
        barContent:{
            width: '100%',
            padding: '4px 16px',
            margin:0,
            maxWidth: 'none !important',
        },
        toolbar:{
            minHeight: '46px !important',
            justifyContent: 'space-between'
        },
        logo:{
            cursor:'pointer', 
            color: theme.palette.primary.contrastText,
        },
        drawerMenu:{
         background:`${theme.palette.primary.main} !important`,
         width:'175px',
         overflowX: 'hidden',
        //  padding:'8px'
        },
        page:{
            width:'100%',
            margin: '0 !important',
            padding: '0 !important',
            display: 'flex !importat',
            flexDirection: 'column',
            alignItems:'center'
        },
        drawerHeader:{
            display: 'flex',
            justifyContent:'center',
            alignItems:'center',
            padding: '4px 8px',
            minHeight: '46px',
            background: theme.palette.primary.main,
            // borderBottom: `1px solid ${theme.palette.primary.dark}`
            boxShadow: '0px 2px 4px 1px rgb(0 0 0 / 17%)'
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
            margin: '50px 0 0 0 !important',
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
        assigneeRow:{
            display:'flex',
            justifyContent:'start',
            alignItems:'center',
            width:'100%',
            // padding:'8px 0'
            cursor:'pointer'
        },
        assigneeAvatar:{
            backgroundColor: `${theme.palette.secondary.dark} !important`,
            color: theme.palette.secondary.contrastText,
            width: '1.8rem !important',
            height: '1.8rem !important',
            fontSize: '1.1rem !important',
            marginRight: '4px'
        },
        userName:{
            padding:'0 16px',
            borderBottom:`1px solid ${theme.palette.primary.dark}`
        }
    })
)

const LayoutWrapper = ({userDetails, isLoading, error, getUserDetails, children}: any) => {
    const theme = useTheme();
    const params = useParams();
    const {isAuthenticated} = useAuthContext();
    const [hasDrawer, setHasDrawer] = useState<boolean>(params?.spaceId? true : false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
    const classes = useStyles(theme);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const {setAuthState} = useAuthContext();
    
    useEffect(() => {
        if(isAuthenticated){
            getUserDetails();
        }
    }, [])

    useEffect(()=>{
        setHasDrawer(params?.spaceId? true : false)
    },[params])

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
        <Container className={classes.pageContainer} style={{alignItems: hasDrawer && isDrawerOpen? 'end': 'center'}}>
        <AppBar color="primary" className={classes.appBar} position='fixed' style={{width: hasDrawer && isDrawerOpen? 'calc(100% - 175px)': '100%'}}>
            <Container className={classes.barContent}>
                <Toolbar disableGutters className={classes.toolbar}>
                    {hasDrawer ? 
                        (isDrawerOpen?
                            <ArrowBackIosNew fontSize="medium" onClick={setIsDrawerOpen.bind(null, !isDrawerOpen)}/>:
                            <MenuOutlined fontSize="medium" onClick={setIsDrawerOpen.bind(null, !isDrawerOpen)}/>
                        ):
                        <StickyNote2OutlinedIcon fontSize="large" className={classes.logo} onClick={reroute.bind(null, '/')}/>
                    }
                    <IconButton onClick={openMenu}>
                        {userDetails ? 
                            <span className={classes.assigneeRow}>
                                <Avatar className={classes.assigneeAvatar}>{getInitials(`${userDetails?.firstName} ${userDetails?.lastName}`)}</Avatar>
                            </span>
                            : <AccountCircleOutlinedIcon fontSize="large" className={classes.logo}/>
                        }
                        
                    </IconButton>
                    <Menu 
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
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
                        <span className={classes.userName}>
                            <Typography variant='body1' component='span'>{`${userDetails?.firstName} ${userDetails?.lastName}`}</Typography>
                        </span>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
        {hasDrawer &&
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
                {/* <br/>
                <hr className={classes.divider}/>
                <br/> */}

                <FoldersContainer/>
                <hr className={classes.divider}/>
            </Drawer>
        }
        <Container className={classes.page} style={{width: hasDrawer && isDrawerOpen? 'calc(100% - 175px)': '100%'}}>
            {children}
        </Container>
        
        </Container>
        
    )
};

export default LayoutWrapper;