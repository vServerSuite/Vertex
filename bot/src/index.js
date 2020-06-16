'use strict';

// Imports
const Discord = require('discord.js');

const config = require('../config/config.json');

const fs = require('fs');
const path = require('path');

// Discord Client Object
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    presence: { status: 'online', activity: { name: 'v!help | Vertex' } },
});

client.commands = new Discord.Collection();

function registerCommands(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            registerCommands(fullPath);
        }
        else {
            const command = require(`./commands/${fullPath.substring(13)}`);
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

// Database
const dbConnection = require('./db/database');

function registerModels(dir) {
    fs.readdirSync(dir).forEach(file => fs.lstatSync(path.join(dir, file)).isDirectory() ? registerModels(path.join(dir, file)) : require(`./db/models/${path.join(dir, file).substring(13)}`));
}

registerModels('src/db/models');

dbConnection.authenticate()
    .then(() => console.log('Connection has been established to the database'))
    .catch(err => console.error('Unable to connect to the database', err));

client
    .login(config.botSettings.token)
    .then(() => {
        console.log();
        console.log();
        console.log('Vertex has been loaded and is listening for commands');
        console.log('Statistics:');
        console.log(`- Current Guilds: ${client.guilds.cache.size}`);
        console.log(`- Command Count: ${client.commands.size}`);
        console.log();
        console.log();
    });