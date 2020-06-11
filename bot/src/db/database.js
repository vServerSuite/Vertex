'use strict';

const config = require('../../config.json');

const Sequelize = require('sequelize');

const con = new Sequelize(config.dbConnection.database, config.dbConnection.username, config.dbConnection.password, {
    host: config.dbConnection.host,
    dialect: config.dbConnection.dialect,
    logging: config.dbConnection.enableLogging == true ? console.log : false,
    define: {
        charset: config.dbConnection.charset,
        timestamps: false,
    },
});

con.sync();

module.exports = con;