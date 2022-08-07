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
            background: `${theme.palette.primary.main} !important`,
            margin: '0 !important',
        },
        accordionTitle:{
            padding:'0px !important',
            margin:'0px !important',
            minHeight: '0px !important'
        },
        accordionContent:{
            backgroundColor: theme.palette.primary.main,
            padding:'0px 16px!important',
            borderTop: `1px solid ${theme.palette.secondary.light}`
        },
        folderLink:{
            cursor: 'pointer'
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

    return(<>
        {folder.children !== null && folder.children.length > 0 &&
            <Accordion className={classes.accordion}>
                <AccordionSummary classes={{content: classes.accordionTitle, root:classes.accordionTitle}}>
                        <Typography variant="body2" onClick={accessFolder} className={classes.folderLink}>
                            {folder.name}
                        </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionContent}>
                    {
                        folder.children.map((child: any)=>
                            <FolderElement folder={child} key={`child${child.id}`}/>
                        )
                    }
                </AccordionDetails>
            </Accordion>
        }
        {(folder.children === null || folder.children.length === 0) &&
            <div>
                <Typography variant="body2" onClick={accessFolder} className={classes.folderLink}>
                    {folder.name}
                </Typography>
            </div>
        }
    </>    
    )
}

const FoldersContainer = ({folders, loading, error, getFolders, selectFolder}: any) => {
    const params = useParams();

    useEffect(()=>{
        getFolders(params?.spaceId);
    },[])

    return (
        <div>
            {
                folders?.map((folder: any) => 
                    <FolderElement folder={folder} selectFolder={selectFolder} key={`folder${folder.id}`}/>
                )
            }
        </div>
    )
}

export default FoldersContainer;