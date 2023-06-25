import React from 'react';
import { Paper } from '@mui/material';

const Navbar = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <Paper elevation={3} className="paper">
                <div className="header">
                    <h1>Team Manager</h1>
                    <a href="/api/1337/players">Manage Players</a> | <a href="/api/1337/status/game">Manage Player Status</a>
                </div>
                </Paper>
            </div>
        </div>
    )
}

export default Navbar;