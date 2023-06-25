import React, {useState} from 'react';
import { Paper } from '@mui/material';
import Navbar from '../components/navbar';
import PlayerList from '../components/playerList';

const Main = () => {

    const [players, setPlayers] = useState([]);

    return (
        <div>
            <Navbar />
            <div className='wrapper'>
            <Paper elevation={3} className='content'>
            <h2>Player List | <a href="/api/1337/players/add">Add Player</a></h2>
            <PlayerList players={players} setPlayers={setPlayers} />
            </Paper>
            </div>
        </div>
    )
}

export default Main;
