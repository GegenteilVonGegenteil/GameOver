const express = require("express");
const router = express.Router();

const consoleController = require("../controllers/consoleController");
const authenticationService = require("../services/authentication");

// Read all consoles
router.get('/', authenticationService.authenticateJWT, consoleController.getAllConsoles);

// Read a console by ID
router.get('/:id', authenticationService.authenticateJWT, consoleController.getConsoleById);

module.exports = router;