'use strict';

const MessageUtils = require('../../utils/MessageUtils');

const guildModel = require('../../db/models/Guild');

module.exports = {
    name: 'setup',
    description: 'Sets up different modules of the bot',
    args: true,
    cooldown: 10,
    guildOnly: false,
    ownerOnly: false,
    usage: '<tickets>',
    execute: async (message, args) => {
        if(args[0]) {
            switch(args[0].toLowerCase()) {
            case 'tickets':
                await setupTickets(message);
                break;
            }
        }
    },
};

async function setupTickets(message) {
    const filters = {
        checkAuthor: m => m.author.id === message.author.id,
        category: m => filters.checkAuthor(m) && m.guild.channels.cache.get(m.content) !== null && m.guild.channels.cache.get(m.content).type === 'category',
        limit: m => filters.checkAuthor(m) && isNaN(m.content) === false && m.content > 0 && m.content < 11,
        message: m => filters.checkAuthor(m),
        options: { max: 1, time: 30000, errors: ['time'] },
    };
    const properties = {
        guild: { where: { id: message.guild.id } },
        delete: { timeout: 10000 },
    };

    MessageUtils.sendAndDelete(message.channel, 'Welcome to the setup for the Tickets module', 10);

    // Category setup for the Tickets being created
    MessageUtils.send(message.channel, 'What is the Id of the category that Vertex should create tickets in?', categoryBotMessage => {
        message.channel.awaitMessages(filters.category, filters.options)
            .then(async categoryUserMessage => {
                await guildModel.update({ ticketCategory: categoryUserMessage.first().content }, properties.guild);
                categoryBotMessage.delete(properties.delete);
                categoryUserMessage.first().delete(properties.delete);

                // Limit setup for the Tickets being created
                MessageUtils.send(message.channel, 'How many tickets should a user be able to have open at one time? `1-10`', limitBotMessage => {
                    message.channel.awaitMessages(filters.limit, filters.options)
                        .then(async limitUserMessage => {
                            await guildModel.update({ ticketLimit: limitUserMessage.first().content }, properties.guild);
                            limitBotMessage.delete(properties.delete);
                            limitUserMessage.first().delete(properties.delete);

                            // Welcome setup for the Tickets being created
                            MessageUtils.send(message.channel, 'What should the message be that is displayed when a user opens a ticket?', welcomeBotMessage => {
                                message.channel.awaitMessages(filters.message, filters.options)
                                    .then(async welcomeUserMessage => {
                                        await guildModel.update({ ticketMessage: welcomeUserMessage.first().content }, properties.guild);
                                        welcomeBotMessage.delete(properties.delete);
                                        welcomeUserMessage.first().delete(properties.delete);

                                        MessageUtils.sendAndDelete(message.channel, 'Setup has been completed', 10);
                                        message.delete();
                                    });
                            });
                        });
                });
            });
    });
}