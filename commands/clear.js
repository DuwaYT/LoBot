module.exports = {
    name: "clear",
    description: "Clears messages",

    async run (client, message, args) {

        const amount = args.join(" ");

        if(!amount) return message.reply('Veuillez donner le nombre de message a supprimer')

        if(amount > 100) return message.reply(`Vous ne pouvez que envoyer 100 messages par la fois`)

        if(amount < 1) return message.reply(`Vous devez supprimer au moin 1 messages`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});
    
    message.channel.send('Réussis!')
    

    }
}

module.exports.config = {
    name: 'clear'
}