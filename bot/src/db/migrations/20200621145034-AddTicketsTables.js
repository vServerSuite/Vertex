'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.createTable('Tickets', {
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
                }),
                queryInterface.createTable('TicketMessages', {
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
                            return this.getDataValue('attachments').split(';');
                        },
                        set(val) {
                            this.setDataValue('attachments', val.join(';'));
                        },
                    },
                }),
                queryInterface.createTable('TicketPanels', {
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
                }),
            ]);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.dropTable('Tickets'),
                queryInterface.dropTable('TicketMessages'),
                queryInterface.dropTable('TicketPanels'),
            ]);
        });
    },
};