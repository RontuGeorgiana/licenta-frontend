import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Card, Container, IconButton, Theme, Typography, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from 'react';
import NameModal from '../components/NameModal';
import TeamRow from "../components/TeamRow";
import { IListTeam } from "../interfaces/team.interface";
import { Days, Months } from '../utils/utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container:{
            height:'100%',
            width:'100%',
            display: 'flex !important',
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'start',
            // padding:'16px 10%',
            // backgroundColor: theme.palette.primary.light
        },
        titleContainer:{
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            width:'100%',
            marginTop:'40px'
        },
        card:{
            width:'100%',
            padding:'16px 0px',
            margin:'0 16px',
            height:'100%'
        }
    })
)

const Home = ({getTeams, addTeam, renameTeam, deleteTeam, leaveTeam, addSpace, teams, error, isLoading}: any) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);

    useEffect(()=>{
        getTeams();
    },[])


    const onAddTeam = (data:any) => {
        addTeam(data.name);
        setIsAddTeamOpen(false);
    }

    const getCurrentDay = ()=>{
        const date = new Date();
        return `${(Days as any)[date.getDay()]}, ${date.getDate()} ${(Months as any)[date.getMonth()]} ${date.getFullYear()}`;
    }

    return(
        <>
        <Container className={classes.container}>
            <div>
                <Typography variant='h6'>{getCurrentDay()}</Typography>
                <Typography variant='h5'>Welcome, user</Typography>

            </div>
            <div className={classes.titleContainer}>
               <Typography variant='h5'>Teams</Typography>
               <IconButton onClick={setIsAddTeamOpen.bind(null,true)}>
                   <AddOutlinedIcon sx={{fontSize:'1.5rem', color: theme.palette.info.main}}/>
               </IconButton>
            </div>
            <Card className={classes.card}>
                {teams && teams.map((team: IListTeam) => (
                    <TeamRow 
                    team={team} 
                    key={team.id} 
                    editTeam={renameTeam}
                    deleteTeam={deleteTeam}
                    leaveTeam={leaveTeam}
                    addSpace={addSpace}
                    />
                ))   
                }
            </Card>
        </Container>
        <NameModal
            submit={onAddTeam}
            open={isAddTeamOpen}
            onClose={setIsAddTeamOpen.bind(null, false)}
            title='Add Team'
            description='Please provide the name for your new team'
        />
        </>
        
        )
}

export default Home;