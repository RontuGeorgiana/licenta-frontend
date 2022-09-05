import { Accordion, AccordionDetails, AccordionSummary, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        logo:{
            cursor:'pointer', 
            color: theme.palette.secondary.contrastText,
        },
        accordion:{
            boxShadow: 'none !important',
            border: 'none',
            borderRadius: '0 !important',
            background: `${theme.palette.background.default}`,
            margin: '0 !important',
        },
        accordionTitle:{
            padding:'0px !important',
            margin:'0px !important',
            minHeight: '0px !important'
        },
        accordionContent:{
            backgroundColor: theme.palette.background.default,
            padding:'0px 4px!important',
            borderTop: `1px solid ${theme.palette.secondary.light}`
        },
        folderLink:{
            cursor: 'pointer',
            marginLeft:'4px !important'
        },
        dropdownContainer:{
            background: `${theme.palette.background.default}`,
            margin: '50px 0 0 0 !important',
        },
        drawerDropdown:{
            boxShadow: 'none !important',
            borderRadius: '0 !important',
            margin: '0 !important',
            background: `${theme.palette.background.default}`,
        },
        drawerDropdownTitle:{
            padding:'0px !important',
            margin:'0px !important',
            minHeight: '0px !important'
        },
        drawerDropdownContent:{
            backgroundColor: `${theme.palette.background.default}`,
            padding:'0px 4px!important',
            borderTop: `1px solid ${theme.palette.secondary.light}`
        },
        selectedTab:{
            background: `${theme.palette.primary.light} !important`
        }

    })
)

const FolderElement = ({folder, selectFolder}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const navigate = useNavigate();
    const params = useParams();

    const accessFolder = (event: any) => {
        event.stopPropagation();
        selectFolder(folder);
        navigate(`/space/${params.spaceId}/folder/${folder.id}`)
    }

    const isTabSelected = (id: number) => {
        if (params?.folderId && Number(params?.folderId) === id){
            return classes.selectedTab;
        }
        return'';
    }

    return(<>
        {folder.children !== null && folder.children.length > 0 &&
            <Accordion className={classes.accordion}>
                <AccordionSummary classes={{content: classes.accordionTitle, root:`${classes.accordionTitle} ${isTabSelected(folder.id)}`}}>
                        <Typography variant="body2" onClick={accessFolder} className={classes.folderLink}>
                            {folder.name}
                        </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionContent}>
                    {
                        folder.children.map((child: any)=>
                            <FolderElement folder={child} selectFolder={selectFolder} key={`child${child.id}`}/>
                        )
                    }
                </AccordionDetails>
            </Accordion>
        }
        {(folder.children === null || folder.children.length === 0) &&
            <div>
                <Typography variant="body2" onClick={accessFolder} className={`${classes.folderLink} ${isTabSelected(folder.id)}`}>
                    {folder.name}
                </Typography>
            </div>
        }
    </>    
    )
}

const FoldersContainer = ({navigation, selectedFolder, loading, error, getNavigation, selectFolder}: any) => {
    const params = useParams();
    const theme = useTheme();
    const classes = useStyles(theme);
    const navigate = useNavigate();

    useEffect(()=>{
        getNavigation(params?.spaceId)
    },[])

    const isTabSelected = (id: number) => {
        if(params?.spaceId && !params?.folderId){
            if(Number(params?.spaceId) === id){
                return classes.selectedTab;
            }
        }
        return'';
    }

    const accessSpace=(event: any, spaceId: number)=>{
        event.stopPropagation();
        navigate(`/space/${spaceId}`)
    }

    const accessTeam=(teamId: number)=>{
        navigate(`/team/${teamId}`)
    }

    return (<div className={classes.dropdownContainer}>
         <div style={{background:'rgba(202, 221, 255, 0.3)'}}>
            <Typography variant="body1" className={classes.folderLink} onClick={()=>{accessTeam(navigation?.id)}}>
                {navigation?.name}
            </Typography>
        </div>
        {navigation?.spaces && 
            navigation?.spaces.map((space: any) => (
                <Accordion className={classes.drawerDropdown}>
                    <AccordionSummary classes={{content: classes.drawerDropdownTitle, root:`${classes.drawerDropdownTitle} ${isTabSelected(space.id)}`}}>
                        <Typography variant="body2" className={classes.folderLink} onClick={(event)=>{accessSpace(event, space.id)}}>
                            {space?.name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.drawerDropdownContent}>
                        {space?.folders && space.folders?.map((folder: any) => 
                                <FolderElement folder={folder} selectFolder={selectFolder} key={`folder${folder.id}`}/>)
                        }
                    </AccordionDetails>
                </Accordion>
            ))

        }
        
    </div>
        
    )
}

export default FoldersContainer;