import { AddOutlined } from '@mui/icons-material';
import { Button, Card, Container, Theme, Typography, useTheme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NameModal from '../components/NameModal';
import FolderRow from '../containers/folderRow.container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card:{
            padding:'16px',
            width:'100%',
            margin:'0 16px',
            height:'100%',
            borderTopLeftRadius:'0 !important',
        },
        container:{
            height:'100%',
            width:'100%',
            display: 'flex !important',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'start',
        },
        titleContainer:{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            width:'100%'
        },
    })
)

const Space = ({getFolders, selectFolder, createFolder, folders, error, isLoading}:any) =>{
    const theme = useTheme();
    const classes  = useStyles(theme);
    const params = useParams();
    const [createOpen, setCreateOpen]=useState(false);

    useEffect(()=>{
        getFolders(params?.spaceId)
    },[])

    useEffect(()=>{
        getFolders(params?.spaceId)
    },[params])
    
    const onCreateFolder = (data: any) => {
        const payload = {
            name: data.name,
            spaceId: params.spaceId,
            teamId: folders.teamId
        };
        createFolder(payload);
        setCreateOpen(false);
    }

    return (
        <>
        <Container className={classes.container}>
            <div className={classes.titleContainer}>
               <Typography variant='h5'>Folders</Typography>
               <Button onClick={setCreateOpen.bind(null,true)} color='info'>
                   <AddOutlined sx={{fontSize:'1rem'}}/>
                   <Typography variant='body2' component='span'>Add folder</Typography>
               </Button>
            </div>
            <Card className={classes.card}>
                {folders && folders?.folderTree?.length > 0 &&
                    folders.folderTree.map((folder:any)=> 
                        <FolderRow folder={folder} teamId={folders.teamId} selectFolder={selectFolder} key={folder.id}/>
                    )

                }
            </Card>
        </Container>
        <NameModal 
            open={createOpen}
            onClose={setCreateOpen.bind(null, false)}
            title='Create folder'
            description='Add a new folder'
            submit={onCreateFolder}
        />
        </>
    )
}

export default Space;