const PlayerController = require('../controllers/player.controller');

module.exports = (app) => {
    app.get('/api/1337/players', PlayerController.findAll);
    app.post('/api/1337/players', PlayerController.create);
    app.put('/api/1337/players/:id/game/:num', PlayerController.update);
    app.delete('/api/1337/players/:id', PlayerController.delete);
}
