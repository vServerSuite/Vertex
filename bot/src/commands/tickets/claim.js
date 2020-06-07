'use strict';

const ticketModel = require('../../models/tickets/Ticket');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'claim',
    description: 'Claims a ticket',
    args: false,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    execute: async (message) => {
        const ticket = await ticketModel.findOne({ channel: message.channel.id });

        if(ticket !== null) {
            await ticketModel.findOneAndUpdate({ id: ticket.id }, { assignedStaff: message.author.id });
            MessageUtils.send(message.channel, `This ticket is now being dealt with by <@${message.author.id}>`);
        }
        else {
            MessageUtils.sendAndDelete(message.channel, 'This is not a ticket channel', 10);
        }
    },
};