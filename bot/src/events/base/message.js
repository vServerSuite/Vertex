'use strict';

module.exports = {
    async handle(client, message) {
        await require('../userUpdate').handle(message.author);
        await require('../command').handle(client, message);
        await require('../ticket/message').handle(message);
    },
};