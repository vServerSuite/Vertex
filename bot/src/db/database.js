'use strict';

const dbConfig = require('../../config/database.json').db;

const Sequelize = require('sequelize');

module.exports = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.enableLogging == true ? console.log : false,
    define: {
        charset: dbConfig.charset,
        timestamps: false,
    },
});