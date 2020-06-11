'use strict';

const axios = require('axios').default;

const config = require('../../../config.json');

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
        axios.get('https://api.thecatapi.com/v1/images/search', { headers: { 'X-API-KEY': config.apiTokens.catApi } })
            .then(response => {
                MessageUtils.sendWithImage(message.channel, 'Found a random cat for you', response.data[0].url);
            });
    },
};