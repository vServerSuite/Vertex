'use strict';

const MessageUtils = require('../../utils/MessageUtils');

const guildModel = require('../../db/models/Guild');

module.exports = {
    async handle(guild) {
        await guildModel.create({
            id: guild.id,
            owner: guild.owner.id,
            name: guild.name,
        });
        guild.client.user.setPresence({ status: 'online', activity: { type: 'WATCHING', name: `${guild.client.guilds.cache.size} Guilds` } });
        console.log(`Vertex has been added to a new guild: ${guild.name}`);
        guild.owner.createDM().then(dm => {
            MessageUtils.send(dm, `Thanks for inviting Vertex to **${guild.name}**`);
        });
    },
};