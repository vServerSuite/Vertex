'use strict';

const ticketModel = require('../../models/tickets/Ticket');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    async handle(member) {
        const openTickets = await ticketModel.find({ guild: member.guild.id, author: member.id, resolved: null });

        openTickets.forEach(async ticket => {
            const ticketChannel = member.guild.channels.cache.get(ticket.channel.toString());
            MessageUtils.send(ticketChannel, 'This ticket has been closed automatically because the creator has left the server');
            await ticketModel.findOneAndUpdate({ id: ticket.id }, { resolved: Date.now() });
            ticketChannel.delete('User left the server');
        });
    },
};