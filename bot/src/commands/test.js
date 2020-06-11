'use strict';

const EmbedGenerator = require('../utils/EmbedGenerator');

module.exports = {
    name: 'test',
    description: 'Test',
    args: false,
    guildOnly: true,
    ownerOnly: true,
    execute: (message) => {
        const joinMessage = `Thank you for adding Vertex to **${message.guild.name}**
        \nTo setup the tickets module of Vertex, please run **v!setup tickets**.`;
        message.channel.send(EmbedGenerator.generate(joinMessage));
    },
};