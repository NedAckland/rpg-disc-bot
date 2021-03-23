const { query } = require('../../common/pgClient.js');

module.exports = {
    name: 'create',
    description: 'create a character',
    usage: '<characterName>',
    args: true,
    rules: ['only one word'],
    execute(message, args) {
        query('SELECT * FROM player WHERE user__id = $1', [message.author.id])
            .then(res => {
                if (res?.rowCount > 0) {
                    message.channel.send(`***You can only have one player***`);
                } else {
                    if (args[0]) {
                        query('INSERT INTO users (user__id) VALUES ($1)', [message.author.id], (err) => {
                            if (err) { return err }}).then(res =>  console.log(res))
                        query('INSERT INTO player (user__id, "name" , "wallet", "level", "xp") VALUES ($1, $2, $3, $4, $5 )', [message.author.id, args[0], 100, 0, 0 ], (err) => {
                            if (err) { return err }}).then(res =>  console.log(res))
                        message.channel.send(`***${args[0]}*** has been created for user ***${message.author.username}***`);
                    } else {
                        message.channel.send(`***Argument required***`);
                    }
                }
            })
    },
};

