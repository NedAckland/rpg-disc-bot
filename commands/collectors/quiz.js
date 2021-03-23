
const quiz = require('../../quiz.json');


module.exports = {
    name: 'quiz',
    description: 'testing collections',
    aliases: ['q'],
    execute(message) {
        let item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        message.channel.send(item.question).then(() => {
            message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
                .then(collected => {
                    message.channel.send(`${collected.first().author} got the correct answer!`);
                })
                .catch(() => {
                    message.channel.send('Looks like nobody got the answer this time.');
                });
        });
    }
};