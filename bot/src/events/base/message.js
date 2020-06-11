'use strict';

module.exports = {
    handle(client, message) {
        require('../command').handle(client, message);
        require('../ticket/message').handle(message);
        require('../userUpdate').handle(message);
    },
};