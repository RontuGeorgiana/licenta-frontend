import { AddOutlined } from '@mui/icons-material';
import { Card, Container, IconButton, Theme, Typography, useTheme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NameModal from '../components/NameModal';
import FolderRow from '../containers/folderRow.container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card:{
            padding:'16px'
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
        console.log(folders)
    },[folders])
    
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
        <Container>
            <div className={classes.titleContainer}>
               <Typography variant='h5'>Folders</Typography>
               <IconButton onClick={setCreateOpen.bind(null,true)}>
                   <AddOutlined />
               </IconButton>
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