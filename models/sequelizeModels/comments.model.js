const { DataTypes } = require('sequelize');
const User = require('./users.model.js');
const Game = require('./games.model.js');
const Console = require('./consoles.model.js');
const sequelize = require('../../services/database').sequelize;

const Comment = sequelize.define('Comment', {
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId',
        },
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Game,
            key: 'gameId',
        },
    },
    consoleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Console,
            key: 'consoleId',
        },
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ssc_comments',
    timestamps: true
});

module.exports = Comment;
