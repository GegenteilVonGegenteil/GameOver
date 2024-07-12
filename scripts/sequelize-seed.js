const sequelize = require("../services/database").sequelize;
const Game = require('../models/sequelizeModels/games.model');
const Console = require('../models/sequelizeModels/consoles.model');
const User = require('../models/sequelizeModels/users.model');
const Comment = require('../models/sequelizeModels/comments.model');

sequelize.authenticate()
.then(() => {console.log("Connection via Sequelize successful!");})
.catch((err) => {console.error("Unable to connect to database: ", err);});

sequelize.sync({force:true}).then(()=>{
    process.exit(0);
})