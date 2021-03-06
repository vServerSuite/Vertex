'use strict';

const EmbedGenerator = require('./EmbedGenerator');

module.exports = {
    getUserFromMention: (client, mention) => {
        const matches = mention.match(/^<@!?(\d+)>$/);
        return !matches ? client.users.cache.get(mention) : client.users.cache.get(matches[1]);
    },
    getRoleFromMention: (guild, mention) => {
        const matches = mention.match(/^<@&?(\d+)>$/);
        return !matches ? guild.roles.cache.get(mention) : guild.roles.cache.get(matches[1]);
    },
    send: (channel, message, callback = null) => {
        channel.send(EmbedGenerator.generate(message)).then(msg => callback != null ? callback(msg) : msg);
    },
    sendAndDelete: (channel, message, secondsToDelete) => {
        channel.send(EmbedGenerator.generate(message)).then(msg => msg.delete({ timeout: secondsToDelete * 1000 }));
    },
    sendWithImage: (channel, message, imageUrl, callback = null) => {
        channel.send(EmbedGenerator.generateWithImage(message, imageUrl)).then(msg => callback != null ? callback(msg) : msg);
    },
    sendWithImageAndDelete: (channel, message, imageUrl, secondsToDelete) => {
        channel.send(EmbedGenerator.generateWithImage(message, imageUrl)).then(msg => msg.delete({ timeout: secondsToDelete * 1000 }));
    },
};