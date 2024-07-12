const consoleModel = require("../models/consoleModel");
const gameModel = require("../models/gameModel");

// Get all consoles from console model
function getAllConsoles(req, res, next) {
    consoleModel.getAllConsoles()
        .then(consoles => {
            res.render('consoles', {consoles})
    })
        .catch((err)=>{
            res.status(404)
            next(err)
        })
}

// Get a console by id from console model, then all games for that console from game model, then render the console page
function getConsoleById(req, res, next) {
    console.log(req.params)
    consoleModel.getConsoleById(parseInt(req.params.id))
        .then((console_) => {
            gameModel.getGameByConsoleId(parseInt(req.params.id)).then((games) => {
                res.render('console', {console_, games})
            })
                .catch((err)=>{
                    res.status(404)
                    next(err)
            })
    })
        .catch((err)=>{
            res.status(404)
            next(err)
        })
}

// If you're reading this, they've chained me to a radiator and are only feeding me lentils
// I don't even like lentils.
// If you can, send something with flavor.
// - Michael

module.exports = {
    getAllConsoles,
    getConsoleById
}