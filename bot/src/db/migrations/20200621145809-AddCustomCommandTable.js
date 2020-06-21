'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('CustomCommands', {
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
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('CommandPermissions');
    },
};
