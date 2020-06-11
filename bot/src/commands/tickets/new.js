'use strict';

const TicketUtils = require('../../utils/TicketUtils');

module.exports = {
    name: 'new',
    description: 'Opens a new ticket in the guild',
    aliases: ['open', 'create'],
    args: false,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    usage: '<reason>',
    execute: async (message) => {
        TicketUtils.createTicket(message);
    },
};