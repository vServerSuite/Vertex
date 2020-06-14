'use strict';

const ticketModel = require('../../db/models/tickets/Ticket');

const MessageUtils = require('../../utils/MessageUtils');
const TicketUtils = require('../../utils/TicketUtils');

module.exports = {
    name: 'close',
    description: 'Closes a ticket',
    args: false,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    requiresPermission: true,
    execute: async (message) => {
        const ticket = await ticketModel.findOne({ where: { channel: message.channel.id } });
        if(ticket !== null) {
            const ticketCloseMessage = await TicketUtils.getCloseMessage(message.author.id, ticket.id);
            message.client.users.fetch(ticket.author).then(async creator => {
                creator.createDM().then(async privateChannel => {
                    privateChannel.send(ticketCloseMessage);
                    message.channel.delete();
                });
            });
        }
        else {
            MessageUtils.sendAndDelete(message.channel, 'This is not a ticket channel', 10);
        }
    },
};