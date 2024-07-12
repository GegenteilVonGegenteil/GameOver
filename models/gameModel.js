const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');
const Game = require('./sequelizeModels/games.model.js');
const Comment = require("./sequelizeModels/comments.model");

// Get all games
function getAllGames(){
    return Game.findAll();
}

// Get game by gameId (primarykey)
function getGameById(id) {
    return Game.findByPk(id);
}

// Get game by consoleId
function getGameByConsoleId(consoleid) {
    return Game.findAll({
        where:{
            consoleid:consoleid
        }
    })
}

module.exports = {
    getAllGames,
    getGameById,
    getGameByConsoleId
}