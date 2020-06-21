'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Guilds', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
            },
            owner: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            prefix: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'v!',
            },
            ticketCategory: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            ticketLimit: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 5,
            },
            ticketMessage: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'Thank you for opening a ticket. Our support team will be with you soon.',
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Guilds');
    },
};
