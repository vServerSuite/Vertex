'use strict';

const Sequelize = require('sequelize');
const database = require('../../database');

module.exports = database.define('TicketPanels', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    guild: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    channel: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    category: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    created: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
});