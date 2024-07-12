const gameModel = require("../models/gameModel");
const commentModel = require("../models/commentModel");
const consoleModel = require("../models/consoleModel");
const userModel = require("../models/userModel");

// Gets all games from the model, then renders the games view
function getAllGames(req, res, next) {
    gameModel.getAllGames()
        .then((games) => {
            res.render('games', {games})
        })
        .catch((err)=>{
            res.status(404)
            next(err)
        })
}

// gets a game by id from the model, gets the corresponding console, comments, then all users for the comments, then renders the game view
function getGameById(req, res, next) {
    // console.log(req.params)
    gameModel.getGameById(parseInt(req.params.id))
        .then((game) => {
            consoleModel.getConsoleById(game.consoleId)
                .then(( console_)=>{
                    commentModel.getCommentsForGame(parseInt(req.params.id))
                        .then((comments) => {
                                userModel.getAllUsers()
                                    .then(users => {
                                        res.render('game', {game, console_, comments, users})
                                    })
                        })
                        .catch((err)=>{
                            res.status(404)
                            next(err)
                        })
                })
        })
        .catch((err)=>{
            res.status(404)
            next(err)
        })
}

// Edit a game
function editGame (req, res, next) {
    gameModel.getGame(parseInt(req.params.id))
        .then(game => res.render('editGame', {user}))
        .catch((err)=>{
            res.status(404)
            next(err)
        })
}

module.exports = {
    getAllGames,
    getGameById,
    editGame
}