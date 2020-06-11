'use strict';

import { MessageEmbed } from 'discord.js';
const axios = require('axios').default;

const MessageUtils = require('../utils/MessageUtils');

module.exports = {
    name: 'shorten',
    description: 'Shortens the given link',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    usage: '<link>',
    execute: async (message, args) => {
        MessageUtils.send(message.channel, 'Generating your shortened link...', shortenMessage => {
            axios.post(`${process.env.SHLINK_URL}/rest/v2/short-urls`, { longUrl: args[0], tags: [`guildId:${message.guild.id}`] }, { headers: { 'X-Api-Key': process.env.SHLINK_API_KEY } })
                .then(response => {
                    shortenMessage.edit(new MessageEmbed(shortenMessage.embeds[0]).setDescription(`Shortened Link: ${response.data.shortUrl}`));
                });
        });
        message.delete();
    },
};