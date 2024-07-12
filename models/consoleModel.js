const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');
const Console = require('./sequelizeModels/consoles.model.js');

// Get all consoles
function getAllConsoles(){
    return Console.findAll();
}

// Get console by consoleId (primarykey)
function getConsoleById(id) {
    return Console.findByPk(id);
}

module.exports = {
    getAllConsoles,
    getConsoleById
}