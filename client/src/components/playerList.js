import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const PlayerList = (props) => {

    const [players, setPlayers] = useState([]);// Array of player objects
    const [open, setOpen] = useState(false); // Delete confirmation dialog
    const [toDelete, setToDelete] = useState(''); // Player ID to delete

    useEffect(() => {
        axios.get('http://localhost:8000/api/1337/players')
            .then(response => {
                console.log(response.data);
                setPlayers(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const removeFromDom = (playerID) => {
        setPlayers(players.filter(player => player._id !== playerID));
    }

    const deletePlayer = (playerID) => {
        axios.delete('http://localhost:8000/api/1337/players/' + playerID)
            .then(res => {
                removeFromDom(playerID);
            })
            .catch(err => console.log(err));
    }

    const handleOpen = (playerID) => { // Open delete confirmation dialog
        setToDelete(playerID); // Set player ID to delete
        setOpen(true); // Open dialog
    };

    const handleClose = () => { // Close delete confirmation dialog
        setOpen(false);
    };

    const handleDelete = () => { // Delete player and close dialog
        deletePlayer(toDelete);
        setOpen(false);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Player Name</TableCell>
                            <TableCell>Preferred Position</TableCell>
                            <TableCell>Remove Player</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            players.map((player, i) =>
                                <TableRow key={i}>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" 
                                        onClick={(e) => { //This pulls up the dialog component
                                            handleOpen(player._id) }}>Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog // A dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision. Dialogs disable all app functionality when they appear, and remain on screen until confirmed, dismissed, or a required action has been taken.
                open={open} // This checks if the dialog is open
                onClose={handleClose} // This is the function that runs when the dialog is closed or canceled
            >
                <DialogTitle>
                    {"Delete Player"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this player?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button // Caneel turns off the dialog
                    onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus //Auto focus is the button that is selected when the dialog opens. This is the delete button which sends the delete request to the server and passes the player ID to the deletePlayer function
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PlayerList;
