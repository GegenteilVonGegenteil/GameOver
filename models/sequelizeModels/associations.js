const Console = require('./consoles.model');
const Game = require('./games.model');
const Comment = require('./comments.model');
const User = require('./users.model');

// Define associations
Console.hasMany(Comment, { foreignKey: 'consoleId' });
Comment.belongsTo(Console, { foreignKey: 'consoleId' });

Console.hasMany(Game, { foreignKey: 'consoleId' }); 
Game.belongsTo(Console, { foreignKey: 'consoleId' }); 

Game.hasMany(Comment, { foreignKey: 'gameId' });
Comment.belongsTo(Game, { foreignKey: 'gameId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
