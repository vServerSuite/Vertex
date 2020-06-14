'use strict';

const MessageEmbed = require('discord.js').MessageEmbed;

module.exports = {
    generate: (description) => generate(description),
    generateWithImage: (description, imageUrl) => generate(description).setImage(imageUrl),
};

function generate(description) {
    return new MessageEmbed()
        .setAuthor('Vertex', 'https://vsuite.dev/images/banner.png', 'https://vsuite.dev')
        .setColor('#101d2d')
        .setFooter('© 2020 vSuite Team | Designed & Built by Ben#2028')
        .setDescription(description);
}