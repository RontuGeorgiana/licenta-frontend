import { AddOutlined } from '@mui/icons-material';
import { Card, Container, IconButton, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FolderRow from '../components/FolderRow';
import TeamRow from '../components/TeamRow';

const Space = ({getFolders, folders, error, isLoading}:any) =>{
    const params = useParams();

    useEffect(()=>{
        getFolders(params?.spaceId)
    },[])

    return (
        <Container>
            <div >
               <Typography variant='h5'>Folders</Typography>
               <IconButton>
                   <AddOutlined />
               </IconButton>
            </div>
            <Card>
                {folders && folders.length > 0 &&
                    folders.map((folder:any)=> 
                        <FolderRow folder={folder} key={folder.id}/>
                    )

                }
            </Card>
        </Container>
    )
}

export default Space;