import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Paper } from '@mui/material';

const PlayerForm = (props) => {
    
    const [player, setPlayer] = useState({
        name: "",
        position: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        position: ""
    });
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/1337/players', player)
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                } else {
                    navigate('/api/1337/players');
                }
            })
            .catch(err => {
                console.log(err.response.data);
                setErrors(err.response.data);
            });
    }

    const onCancel = (e) => {
        navigate('/api/1337/players');
    }

    return (
        <Paper elevation={3} sx={{ p: 2, width: 400, margin: 'auto' }}>
        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Player Name"
                name="name"
                autoFocus
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                onChange={(e) => setPlayer({ ...player, name: e.target.value })}
            />
            <TextField
                margin="normal"
                fullWidth
                name="position"
                label="Preferred Position"
                id="position"
                error={!!errors.position}
                helperText={errors.position ? errors.position.message : ""}
                onChange={(e) => setPlayer({ ...player, position: e.target.value })}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!player.name || !!errors.name || !!errors.position} // disable button if name is empty or if there are errors
            >
                Add Player
            </Button>
            <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={onCancel}
            >
                Cancel
            </Button>
        </Box>
        </Paper>
    )
}

export default PlayerForm;
