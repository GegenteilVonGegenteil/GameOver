require('dotenv').config()
const { Sequelize } = require ('sequelize')

// create a new sequelize instance with the connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectModule:require("mysql2"),
        dialectOptions: {
            connectTimeout: 60000,
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        },
        logging: (msg) => console.log(msg), // Enable detailed logging
    });

sequelize.authenticate().then(() => {
    console.log('[SUCCESS] Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

module.exports ={sequelize};