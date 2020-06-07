'use strict';

import { MessageEmbed } from 'discord.js';
const MessageUtils = require('../utils/MessageUtils');

module.exports = {
    name: 'ping',
    description: 'Checks the ping of the bot',
    args: false,
    cooldown: 10,
    guildOnly: false,
    ownerOnly: false,
    usage: null,
    execute: (message) => {
        MessageUtils.send(message.channel, 'Checking ping...', pingMessage => {
            pingMessage.edit(new MessageEmbed(pingMessage.embeds[0]).setDescription(`Ping received. Latency is ${pingMessage.createdTimestamp - message.createdTimestamp}ms`));
        });
    },
};