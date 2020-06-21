'use strict';

const { version } = require('../../../package.json');
const { version: djsVersion } = require('discord.js');

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
        aboutEmbed.addField('Author', 'Ben#2028', true);
        aboutEmbed.addField('Source Code', '[Click Here](https://github.com/vServerSuite/Vertex)', true);
        aboutEmbed.addField('Bot Version', version, true);
        aboutEmbed.addField('DiscordJS Version', djsVersion, true);
        aboutEmbed.addField('NodeJS Version', process.version, true);
        aboutEmbed.addField('Guilds', message.client.guilds.cache.size, true);
        aboutEmbed.addField('Command Count', message.client.commands.size, true);
        message.channel.send(aboutEmbed);
    },
};