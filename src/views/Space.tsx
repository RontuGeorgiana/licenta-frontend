import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Space = ({getFolders}:any) =>{
    const params = useParams();

    useEffect(()=>{
        getFolders(params?.spaceId)
    },[])

    return (
        <div>
            {params.spaceId}</div>
    )
}

export default Space;