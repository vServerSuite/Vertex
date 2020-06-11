'use strict';

const Sequelize = require('sequelize');
const database = require('../../database');

module.exports = database.define('TicketMessages', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    messageId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    author: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    ticket: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    attachments: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('attachments').split(';')
        },
        set(val) {
            this.setDataValue('attachments', val.join(';'));
        },
    },
});