'use strict';

const axios = require('axios').default;

const config = require('../../../config/config.json');

const MessageEmbed = require('discord.js').MessageEmbed;

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'dog',
    description: 'Gets a random photo of a dog',
    args: false,
    cooldown: 10,
    guildOnly: false,
    ownerOnly: false,
    usage: null,
    execute: (message) => {
        MessageUtils.send(message.channel, 'Finding a cute dog for you...', dogChannelMessage => {
            axios.get('https://api.thedogapi.com/v1/images/search', { headers: { 'X-API-KEY': config.apiTokens.dogApi } })
                .then(response => {
                    dogChannelMessage.edit(new MessageEmbed(dogChannelMessage.embeds[0]).setDescription('Found a random dog for you').setImage(response.data[0].url));
                });
        });
    },
};