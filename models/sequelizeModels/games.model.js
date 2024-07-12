const { DataTypes } = require('sequelize');
const Console = require('./consoles.model.js');
const sequelize = require('../../services/database').sequelize;

const Game = sequelize.define('Game', {
    consoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Console,
            key: 'consoleId',
        },
    },
    gameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    subname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    releaseyear: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    producer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'ssc_games',
    timestamps: true
});

module.exports = Game;
