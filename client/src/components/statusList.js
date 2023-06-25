import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/system';

// Define styled ToggleButtons with custom colors
const PlayingButton = styled(ToggleButton)({ // styled is a function that takes a component and returns a new component that is styled. In this case, it is taking the ToggleButton component and returning a new component that is styled called PlayingButton.

    '&.Mui-selected': { // & is a selector that refers to the component itself. So it is saying that if the component has the class Mui-selected, then apply the following styles
        backgroundColor: 'green',

        '&:hover': { // &:hover is a selector that refers to the component itself when it is hovered over. So it is saying that if the component has the class Mui-selected and it is hovered over, then apply the following styles
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
    const [players, setPlayers] = useState([]); // players is an array of Player Model objects that has a statuses property that is an array of objects containing game and status properties

    useEffect(() => {
        axios.get('http://localhost:8000/api/1337/players') // get all players
            .then(response => {
                console.log(response.data);
                setPlayers(response.data);
            })
            .catch(error => console.log(error));
    }, []);


    const handleStatusChange = (playerId) => (event, newStatus) => { // This returns a function that takes an event and a newStatus. This is the function that will be called when the status changes. The newStatus will be the status value from the toggle button that the user selected from the ToggleButtonGroup.

        const player = players.find(player => player._id === playerId); // find the player whose id matches the playerId passed in from the toggle button that was clicked in the mapped players array.
        //The players state is an array of objects. We want to find the object that has an _id property that matches the playerId passed in. This is why we use the find method instead of the filter method. The find method returns the first object that matches the condition and assigns it to the player variable.
        
        // update the status for this game
        const statusIndex = player.statuses.findIndex(status => status.game === gameNum); // find the index of the status for this game.
        //The statuses property of the player object is an array of objects. Each object has a game property and a status property. We want to find the index of the object that has a game property that matches the gameNum passed in. If there is no status for this game, statusIndex will be -1.

        if (statusIndex !== -1) { // if the status for this game exists, meaning statusIndex is not -1

            console.log('statusIndex', statusIndex);
            player.statuses[statusIndex].status = newStatus; // update the status of that particular player we found for this game.
            //This is why we used the findIndex method instead of the find method. The findIndex method returns the index of the first object that matches the condition, whereas the find method returns the first object that matches the condition. If there is no status for this game, statusIndex will be -1, and we will not update the status. The 'find' method would have returned undefined, and we would have gotten an error when we tried to update the status.

        } else {
            player.statuses.push({ game: gameNum, status: newStatus }); // add a new status for this game
            // This will add a new object to the statuses array. The new object will have a game property that is equal to gameNum and a status property that is equal to newStatus.
        }

        // update the status in the database
        axios.put(`http://localhost:8000/api/1337/players/${playerId}/game/${gameNum}`, { status: newStatus })
        //This is a put request to the route /api/1337/players/:playerId/game/:gameNum. The :playerId and :gameNum are placeholders for the playerId and gameNum passed in. The status is an object with a status property that is equal to newStatus. The status property will be added to the request body.

            .then(response => {
                // update the players state
                console.log("The new status for", player.name, "on game ", gameNum, "is", player.statuses[statusIndex].status);

                setPlayers(prevPlayers => prevPlayers.map(prevPlayer => prevPlayer._id === playerId ? player : prevPlayer)); 
                // The ternary operator will return the player object if the _id property of the player object matches the playerId passed in. Otherwise, it will return the prevPlayer object. We do this because we want to update the player object in the players state with the new status. We use the map method to return a new array of objects. The map method will return a new array of objects where the object with the _id property that matches the playerId passed in will be replaced with the player object. The other objects will be the same as before.
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

                                            onChange={handleStatusChange(player._id)} // when the status is changed, call the handleStatusChange function, passing in the player id mapped to the toggle button group
                                        >
                                            <PlayingButton // My specially styled toggle button components.
                                            value="Playing" aria-label="Playing">
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
