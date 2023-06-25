import React from 'react';
import NavBar from '../components/navbar';
import PlayerForm from '../components/playerForm';

const AddNew = (props) => {
    
        return (
            <div>
                <NavBar
                />
                <div className='content'>
                    <h2>Add a new player:</h2>
                    <PlayerForm
                    />
                </div>
            </div>
        )
    }

export default AddNew;