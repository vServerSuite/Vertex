'use strict';

const MessageEmbed = require('discord.js').MessageEmbed;

module.exports = {
    generate: (description) => {
        return new MessageEmbed()
            .setAuthor('Vertex', 'https://vsuite.dev/images/banner.png', 'https://vsuite.dev')
            .setColor('#101d2d')
            .setFooter('© 2020 vSuite Team | Designed & Built by Ben#2028')
            .setDescription(description);
    },
    generateWithImage: (description, imageUrl) => this.generate(description).setImage(imageUrl),
};