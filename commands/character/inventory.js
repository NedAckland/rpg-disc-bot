const { query } = require('../../common/pgClient.js');

module.exports = {
    name: 'inventory',
    description: 'contents of your inventory',
    aliases: ['i'],
    execute(message, args) {
        if (args[0] === 'add' && args[1]) {
            query('INSERT INTO items (name, owner__id, value, buff, category) VALUES ($1, $2, $3, $4, $5)', [args[1], message.author.id, 300, 'Default', 'Default'] )
                .then(res => {
                    console.log(res?.rows)
                    message.channel.send(`Success`)

                })
        } else {
           query('SELECT * from items where owner__id = $1', [message.author.id]).then(res => {
               if(!res?.rowCount) {
                   message.channel.send(`no items`)
               } else {
                    const inventory = []
                    for(let i of res?.rows){
                        inventory.push(`***${i.name}*** - ***$${i.value}*** - ***${i.category}*** - ***${i.buff}***  `)
                    }
                    message.channel.send(`${inventory.join('\n')}`)
               }
           })
        }
    },
};
