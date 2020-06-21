'use strict';

const guildModel = require('../../db/models/Guild');

module.exports = {
    async handle(guild) {
        await guildModel.destroy({ where: { id: guild.id } });
        guild.client.user.setPresence({ status: 'online', activity: { type: 'WATCHING', name: `${guild.client.guilds.cache.size} Guilds` } });
    },
};