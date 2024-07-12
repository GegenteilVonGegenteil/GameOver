const { DataTypes } = require('sequelize');
const sequelize = require("../../services/database").sequelize;

const Console = sequelize.define('Console', {
    consoleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseyear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'ssc_consoles',
    timestamps: true
});

module.exports = Console;
