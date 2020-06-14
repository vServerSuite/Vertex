'use strict';

const MessageEmbed = require('discord.js').MessageEmbed;

const axios = require('axios').default;

const config = require('../../../config/config.json');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'shorten',
    description: 'Shortens the given link',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    usage: '<link>',
    requiresPermission: true,
    execute: async (message, args) => {
        MessageUtils.send(message.channel, 'Generating your shortened link...', shortenMessage => {
            axios.post(`${config.shlink.baseUrl}/rest/v2/short-urls`, { longUrl: args[0], tags: [`guildId:${message.guild.id}`] }, { headers: { 'X-Api-Key': config.shlink.apiKey } })
                .then(response => {
                    shortenMessage.edit(new MessageEmbed(shortenMessage.embeds[0]).setDescription(`Shortened Link: ${response.data.shortUrl}`));
                });
        });
        message.delete();
    },
};