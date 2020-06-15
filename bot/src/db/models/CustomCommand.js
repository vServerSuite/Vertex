'use strict';

const Sequelize = require('sequelize');
const database = require('../database');

module.exports = database.define('CustomCommands', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    guild: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    trigger: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    response: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});