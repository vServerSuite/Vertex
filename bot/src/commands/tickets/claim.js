'use strict';

const ticketModel = require('../../db/models/tickets/Ticket');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'claim',
    description: 'Claims a ticket',
    args: false,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    requiresPermission: true,
    execute: async (message) => {
        const ticket = await ticketModel.findOne({ where: { channel: message.channel.id } });

        if(ticket !== null) {
            await ticketModel.update({ assignedStaff: message.author.id }, { where: { id: ticket.id } });
            MessageUtils.send(message.channel, `This ticket is now being dealt with by <@${message.author.id}>`);
        }
        else {
            MessageUtils.sendAndDelete(message.channel, 'This is not a ticket channel', 10);
        }
    },
};