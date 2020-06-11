'use strict';

const Sequelize = require('sequelize');
const database = require('../../database');

module.exports = database.define('Tickets', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    guild: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    author: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    channel: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    resolved: {
        type: Sequelize.DATE,
    },
    assignedStaff: {
        type: Sequelize.BIGINT,
    },
});