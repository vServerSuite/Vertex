'use strict';

const MessageUtils = require('../../utils/MessageUtils');
const guildModel = require('../../models/Guild');

module.exports = {
    handle(guild) {
        guildModel.create({
            id: guild.id,
            owner: guild.owner.id,
            name: guild.name,
            icon: guild.icon,
        });
        console.log(`Vertex has been added to a new guild: ${guild.name}`);
        guild.owner.createDM().then(dm => {
            MessageUtils.send(dm, `Thanks for inviting Vertex to **${guild.name}**`);
        });
    },
};