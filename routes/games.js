const express = require('express');
const router = express.Router();
const authenticationService = require("../services/authentication");
const gameController = require("../controllers/gameController.js");


// adding the middleware manually to all the functions, so we can control specific routes to be protected
// Read all consoles
router.get('/', authenticationService.authenticateJWT, gameController.getAllGames);

// Read a console by ID
router.get('/:id', authenticationService.authenticateJWT, gameController.getGameById);

module.exports = router;