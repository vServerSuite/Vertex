'use strict';

const { v4: uuidv4 } = require('uuid');

const ticketPanel = require('../../models/tickets/TicketPanel');

const MessageUtils = require('../../utils/MessageUtils');

module.exports = {
    name: 'panel',
    description: 'Manages Ticket Panels',
    args: true,
    cooldown: 5,
    guildOnly: true,
    ownerOnly: false,
    usage: '<create/list/remove>',
    execute: async (message, args) => {
        if(args[0]) {
            switch(args[0].toLowerCase()) {
            case 'create':
                if(args.length < 3) {
                    MessageUtils.sendAndDelete(message.channel, 'Invalid Usage. Usage: v!panel create <categoryId> <message>', 10);
                }
                else {
                    const category = message.guild.channels.cache.get(args[1]);
                    if(category !== undefined && category.type === 'category') {

                        const panelMessage = args;
                        panelMessage.splice(0, 2);
                        MessageUtils.send(message.channel, panelMessage.join(' '), async panel => {
                            await ticketPanel.create({
                                id: panel.id,
                                guild: message.guild.id,
                                channel: message.channel.id,
                                create_category: category.id,
                                message: panelMessage.join(' '),
                            });
                            panel.react('✅');
                        });
                    }
                    else {
                        MessageUtils.sendAndDelete(message.channel, 'A category with that Id could not be found', 10);
                    }
                }
                break;
            }
        }
    },
};