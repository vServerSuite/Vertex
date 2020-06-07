'use strict';

const ticketMessageModel = require('../../models/tickets/TicketMessage');
const ticketModel = require('../../models/tickets/Ticket');

module.exports = {
    async handle(message) {
        const ticket = await ticketModel.findOne({ channel: message.channel.id });
        if(ticket !== null) {
            const content = message.content == '' ? message.embeds == null ? null : message.embeds[0].description : message.cleanContent;
            ticketMessageModel.create({
                id: message.id,
                author: message.author.id,
                ticket: ticket.id,
                content: content,
                attachments: message.attachments == null ? [] : message.attachments.map(attachment => attachment.attachment),
            });
        }
    },
};