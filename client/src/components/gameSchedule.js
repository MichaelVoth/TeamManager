import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GameSchedule = ({ onGameChange }) => { 
    const [games, setGames] = useState(() => { // initialize games to the value in local storage, or to [1] if nothing in local storage

        //Local storage is a way to store data on the user's computer. It is a key-value store, where the key is a string and the value is a string. Basically "Session" for the browser.
        const localGames = localStorage.getItem('games'); // get the games from local storage
        return localGames ? JSON.parse(localGames) : [1]; // if there are games in local storage, parse them and return them, otherwise return [1]
    });

    useEffect(() => { // update local storage whenever games changes
        localStorage.setItem('games', JSON.stringify(games)); // save the games to local storage
    }, [games]); // run this effect whenever games changes

    const addGame = () => {
        setGames([...games, games.length + 1]); // add a new game to the end of the array
    };

    return (
        <div className='gameSchedule'>
            {games.map((gameNum) => (
                <Link key={gameNum} onClick={() => onGameChange(gameNum)}>
                    Game {gameNum}, </Link>
            ))}
            <br /><br />
            <button onClick={addGame}>Add Game</button>
            <button onClick={() => setGames(games.slice(0, games.length - 1))}>Remove Game</button>
        </div>
    );
};

export default GameSchedule;
