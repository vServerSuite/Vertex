'use strict';

const ticketMessageModel = require('../../db/models/tickets/TicketMessage');
const ticketModel = require('../../db/models/tickets/Ticket');

module.exports = {
    async handle(message) {
        const ticket = await ticketModel.findOne({ where: { channel: message.channel.id } });
        if(ticket !== null) {
            await ticketMessageModel.create({
                messageId: message.id,
                author: message.author.id,
                ticket: ticket.id,
                content: message.content == (null || '') ? message.embeds == null ? null : message.embeds[0].description : message.cleanContent,
                attachments: message.attachments == null ? [] : message.attachments.map(attachment => attachment.attachment),
            });
        }
    },
};