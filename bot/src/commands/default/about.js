'use strict';

const version = require('../../../package.json').version;

const EmbedGenerator = require('../../utils/EmbedGenerator');

module.exports = {
    name: 'about',
    description: 'Displays information about this bot',
    args: false,
    guildOnly: false,
    ownerOnly: false,
    execute: (message) => {
        const aboutEmbed = EmbedGenerator.generate('Vertex information:');
        aboutEmbed.addField('Name', 'Vertex', true);
        aboutEmbed.addField('Version', version, true);
        aboutEmbed.addField('Guilds', message.client.guilds.cache.size, true);
        message.channel.send(aboutEmbed);
    },
};