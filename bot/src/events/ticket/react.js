'use strict';

const ticketPanel = require('../../db/models/tickets/TicketPanel');

const TicketUtils = require('../../utils/TicketUtils');

module.exports = {
    async handle(messageReaction, user) {
        if(user.bot) return;
        if(messageReaction.emoji.name === '✅') {
            const panel = await ticketPanel.findOne({ where: { id: messageReaction.message.id } });
            if(panel !== null) {
                TicketUtils.createTicketFromReaction(messageReaction, user, panel.create_category.toString());
                messageReaction.users.remove(user.id);
            }
        }
    },
};