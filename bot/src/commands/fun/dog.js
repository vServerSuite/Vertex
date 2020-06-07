'use strict';

const axios = require('axios').default;
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
        axios.get('https://api.thedogapi.com/v1/images/search', { headers: { 'X-API-KEY': process.env.DOG_API_TOKEN } })
            .then(response => {
                MessageUtils.sendWithImage(message.channel, 'Found a random dog for you', response.data[0].url);
            });
    },
};