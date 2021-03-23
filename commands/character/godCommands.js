const { query } = require('../../common/pgClient.js');

module.exports = {
    name: 'god',
    aliases: ['seed'],
    description: 'dev tools',
    usage: '<cash> <?amount> ***or*** <xp> <?amount> ***or*** <reset> ',
    execute(message, args) {
        if(args[0] === 'cash') {
            query('UPDATE player SET wallet = (wallet + $1) WHERE user__id = $2', [!args[1] ? 1000 : args[1], message.author.id]).then(
                () => message.channel.send(`done`)
            )
        } else if(args[0] === 'xp') {
            query('UPDATE player SET xp = (xp + $1) WHERE user__id = $2', [!args[1] ? 1000 : args[1], message.author.id]).then(
                () => message.channel.send(`done`)
            )
        } else if(args[0] === 'reset') {
            query('UPDATE player SET xp = ($1), wallet = ($2) WHERE user__id = $3', [0, 0, message.author.id]).then(
                () => message.channel.send(`done`)
            )
        }
    },
};

