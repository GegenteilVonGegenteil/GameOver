require('dotenv').config()
const mysql = require('mysql2')
const { Sequelize } = require ('sequelize')

// connection config with the credentials stored in the .env file
const config = mysql.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// connect to the database
config.connect(function(err){
    if (err) throw err;
});

// create a new sequelize instance with the connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });

module.exports = { config, sequelize };