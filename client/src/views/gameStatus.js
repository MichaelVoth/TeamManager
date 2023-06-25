import React, { useState } from 'react';
import Navbar from '../components/navbar';
import GameSchedule from '../components/gameSchedule';
import StatusList from '../components/statusList';

const GameStatusPage = () => {
    const [currentGameNum, setCurrentGameNum] = useState(1); // start with game 1


    const handleGameChange = (gameNum) => { // event handler for when a game is selected
        setCurrentGameNum(gameNum); // update the current game number
    };

    return (
        <div>
            <Navbar/>
            <div className="wrapper">
            <div className="content">
            <GameSchedule onGameChange={handleGameChange} />
            <StatusList gameNum={currentGameNum} />
            </div>
            </div>
        </div>
    );
};

export default GameStatusPage;
