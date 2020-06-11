'use strict';

const guildModel = require('../../db/models/Guild');

module.exports = {
    async handle(guild) {
        await guildModel.destroy({ where: { id: guild.id } });
    },
};