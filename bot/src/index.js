'use strict';

// Imports
import { Client, Collection } from 'discord.js';

const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Database Logic
const mongoose = require('mongoose');

global.db = mongoose.createConnection(process.env.dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// Discord Client Object
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Collection();

function registerCommands(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            registerCommands(fullPath);
        }
        else {
            const command = require(`.\\commands\\${fullPath.substring(13)}`);
            client.commands.set(command.name, command);
        }
    });
}

registerCommands('src/commands');

client.on('message', message => require('./events/base/message').handle(client, message));

// Ticket Events
client.on('messageUpdate', async (oldMessage, newMessage) => await require('./events/ticket/messageUpdate').handle(oldMessage, newMessage));
client.on('messageReactionAdd', async (messageReaction, user) => await require('./events/ticket/react').handle(messageReaction, user));
client.on('guildMemberRemove', async member => await require('./events/ticket/leave').handle(member));

// Guild Events
client.on('guildCreate', guild => require('./events/guild/join').handle(guild));
client.on('guildUpdate', async (oldGuild, newGuild) => await require('./events/guild/update').handle(oldGuild, newGuild));
client.on('guildDelete', async guild => require('./events/guild/leave').handle(guild));

client
    .login(process.env.BOT_TOKEN)
    .then(() => {
        console.log();
        console.log();
        console.log('Vertex has been loaded and is listening for commands');
        console.log('Statistics:');
        console.log(`- Current Guilds: ${client.guilds.cache.size}`);
        console.log(`- Command Count: ${client.commands.size}`);
        console.log();
        console.log();

        client.user.setPresence({ status: 'online', activity: { name: 'v!help | Vertex' } });
    });