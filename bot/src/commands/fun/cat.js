'use strict';

const axios = require('axios').default;

const config = require('../../../config/config.json');

const MessageEmbed = require('discord.js').MessageEmbed;

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'cat',
    description: 'Gets a random photo of a cat',
    args: false,
    cooldown: 10,
    guildOnly: false,
    ownerOnly: false,
    usage: null,
    execute: (message) => {
        MessageUtils.send(message.channel, 'Finding a cute cat for you...', catChannelMessage => {
            axios.get('https://api.thecatapi.com/v1/images/search', { headers: { 'X-API-KEY': config.apiTokens.catApi } })
                .then(response => {
                    catChannelMessage.edit(new MessageEmbed(catChannelMessage.embeds[0]).setDescription('Found a random cat for you').setImage(response.data[0].url));
                });
        });
    },
};