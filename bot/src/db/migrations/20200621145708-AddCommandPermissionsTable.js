'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('CommandPermissions', {
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
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('CommandPermissions');
    },
};
