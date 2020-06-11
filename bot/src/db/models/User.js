'use strict';

const Sequelize = require('sequelize');
const database = require('../database');

module.exports = database.define('Users', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    discrim: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    coreTeam: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});