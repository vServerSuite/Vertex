'use strict';

const ticketModel = require('../../db/models/tickets/Ticket');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    async handle(member) {
        const openTickets = await ticketModel.findAll({ where: { guild: member.guild.id, author: member.id, resolved: null } });

        openTickets.forEach(async ticket => {
            const ticketChannel = member.guild.channels.cache.get(ticket.channel.toString());
            MessageUtils.send(ticketChannel, 'This ticket has been closed automatically because the creator has left the server');
            await ticketModel.update({ resolved: Date.now() }, { where: { id: ticket.id } });
            ticketChannel.delete('User left the server');
        });
    },
};