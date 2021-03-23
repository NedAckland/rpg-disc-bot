const { query } = require('../../common/pgClient.js');

module.exports = {
    name: 'user',
    aliases: ['u', 'stats'],
    description: 'stats on user',
    execute(message, args) {
        query('SELECT * FROM player WHERE user__id = $1', [message.author.id]).then(
            res => message.channel.send(`Stats for ***${res?.rows[0].name}***\nWallet value: ***$${res?.rows[0].wallet}***\nXP: ***${res?.rows[0].xp}***\nLevel: ***${Math.floor(.25 * Math.sqrt(res?.rows[0].xp))}***`)
        )
    }
};

