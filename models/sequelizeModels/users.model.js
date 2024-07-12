const { DataTypes } = require('sequelize');
const sequelize = require("../../services/database").sequelize;

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    profile_pic: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'ssc_users',
    timestamps: true
});

module.exports = User;
