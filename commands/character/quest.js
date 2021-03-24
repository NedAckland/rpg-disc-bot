const { query } = require('../../common/pgClient.js');

module.exports = {
    name: 'quest',
    description: 'testing collections',
    aliases: ['qu'],
    execute: function (message, args) {
        const answers = ['yes', 'ye', 'okay']
        query('SELECT * FROM player WHERE user__id = $1', [message.author.id])
            .then(res => {
                if (args[0] === 'status') return message
                    .channel
                    .send(`hello ***${res?.rows[0].name}*** you are ${res?.rows[0].onquest ? 'On a quest' : 'resting at home'} `);
                if (!res?.rows[0].onquest) {
                    const filter = response => {
                        return answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
                    };
                    message.channel.send("would you like to go on a quest?").then(() => {
                        message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
                            .then(collected => {
                                query('UPDATE player SET onquest = (true) where user__id = $1', [message.author.id]).then(r => console.log(r?.rows[0]))
                                message.channel.send(`${collected.first().author} is going on a quest!`);
                            })
                            .catch(() => {
                                message.channel.send('maybe next time');

                            });
                    });
                } else {
                    message.channel.send("would you like to go home?").then(() => {
                        const filter = response => {
                            return answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
                        };
                        message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
                            .then(collected => {
                                query('UPDATE player SET onquest = (false) where user__id = $1', [message.author.id]).then(r => console.log(r?.rows[0]))
                                message.channel.send(`${collected.first().author} is going home now!`);
                            })
                            .catch(() => {
                                message.channel.send('never mind');

                            });
                    });
                }

            })
    }
}