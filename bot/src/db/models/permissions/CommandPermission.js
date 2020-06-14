'use strict';

const Sequelize = require('sequelize');
const database = require('../../database');

module.exports = database.define('CommandPermissions', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    guild: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    command: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
});