const Player = require('../models/player.model');

module.exports = {
    findAll: (request, response) => {
        Player.find({})
            .then(allPlayers => response.json(allPlayers))
            .catch(err => response.status(400).json(err))
    },
    
    create: (request, response) => {
        Player.create(request.body)
            .then(player => response.json(player))
            .catch(err => response.status(400).json(err))
    },
    update: (request, response) => {
        const { id } = request.params; // player id
        const num = Number(request.params.num); // game number, converted to a number
        const { status } = request.body; // status is the new status for the game
    
        Player.findById(id) // find the player by id
            .then(player => {
                if (!player) { // if player not found
                    response.status(404).json({ message: "Player not found" });
                } else { // if player found
                    const gameStatus = player.statuses.find(status => status.game === num); // find the game status for the game number
                    if (gameStatus) { // if game status found
                        gameStatus.status = status; // update the status
                    } else { // if game status not found
                        player.statuses.push({ game: num, status }); // create a new game status
                    }
                    return player.save(); // save the player
                }
            })
            .then(updatedPlayer => response.json(updatedPlayer))
            .catch(err => response.status(400).json(err));
    },
    
    delete: (request, response) => {
        Player.deleteOne({_id: request.params.id})
            .then(deleteConfirm => response.json(deleteConfirm))
            .catch( err => response.status(400).json(err))
    }

}