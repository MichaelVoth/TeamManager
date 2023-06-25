import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/system';

// Define styled ToggleButtons with custom colors
const PlayingButton = styled(ToggleButton)({
    '&.Mui-selected': {
        backgroundColor: 'green',
        '&:hover': {
            backgroundColor: 'darkgreen',
        },
    },
});

const NotPlayingButton = styled(ToggleButton)({
    '&.Mui-selected': {
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: 'darkred',
        },
    },
});

const UndecidedButton = styled(ToggleButton)({
    '&.Mui-selected': {
        backgroundColor: 'yellow',
        '&:hover': {
            backgroundColor: 'gold',
        },
    },
});

const StatusList = (props) => {
    const { gameNum } = props; // get gameNum from props
    const [players, setPlayers] = useState([]); // players is an array of objects that has a statuses property that is an array of objects

    useEffect(() => {
        axios.get('http://localhost:8000/api/1337/players') // get all players
            .then(response => {
                console.log(response.data);
                setPlayers(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const handleStatusChange = (playerId) => (event, newStatus) => {
        // find the player whose status was changed
        const player = players.find(player => player._id === playerId); // find the player whose id matches the playerId passed in

        // update the status for this game
        const statusIndex = player.statuses.findIndex(status => status.game === gameNum); // find the index of the status for this game
        if (statusIndex !== -1) { // if the status for this game exists
            player.statuses[statusIndex].status = newStatus; // update the status
        } else {
            player.statuses.push({ game: gameNum, status: newStatus }); // add a new status for this game
        }

        // update the status in the database
        axios.put(`http://localhost:8000/api/1337/players/${playerId}/game/${gameNum}`, { status: newStatus })
            .then(response => {
                // update the players state
                console.log(response.data.name, response.data.statuses);
                setPlayers(prevPlayers => prevPlayers.map(prevPlayer => prevPlayer._id === playerId ? player : prevPlayer));
            })
            .catch(error => console.log(error));
    };


    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Player Name</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            players.map((player, i) => // for each player
                                <TableRow key={i}>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>
                                        <ToggleButtonGroup
                                            exclusive // only one button can be selected at a time
                                            value={player.statuses.find(status => status.game === gameNum)?.status || 'Undecided'} // set the value of the toggle button group to the status for this game, or 'Undecided' if there is no status for this game
                                            onChange={handleStatusChange(player._id)} // when the status is changed, call the handleStatusChange function, passing in the player id
                                        >
                                            <PlayingButton value="Playing" aria-label="Playing">
                                                Playing
                                            </PlayingButton>
                                            <NotPlayingButton value="Not Playing" aria-label="Not Playing">
                                                Not Playing
                                            </NotPlayingButton>
                                            <UndecidedButton value="Undecided" aria-label="Undecided">
                                                Undecided
                                            </UndecidedButton>
                                        </ToggleButtonGroup>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default StatusList;
