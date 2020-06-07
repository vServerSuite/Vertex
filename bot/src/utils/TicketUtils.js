'use strict';

const ticketModel = require('../models/tickets/Ticket');

const EmbedGenerator = require('./EmbedGenerator');

module.exports = {
    getTotalTickets: (guildId, callback) => ticketModel.countDocuments({ guild: guildId }).exec().then(count => callback(count)),
    getCloseMessage: async (ticketCloser, ticketId) => {
        const ticket = await ticketModel.findOne({ id: ticketId });
        const closeEmbed = EmbedGenerator.generate(`A ticket was closed by <@${ticketCloser}>.`);
        closeEmbed.addField('Id', ticket.id, true);
        closeEmbed.addField('Author', `<@${ticket.author}>`, true);
        closeEmbed.addField('Logs', `http://example.com/${ticket.guild}/logs/${ticket.id}`, true);
        return closeEmbed;
    },
};