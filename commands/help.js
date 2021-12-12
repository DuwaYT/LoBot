const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "simple help command",

    async run (bot, message, args) {
        message.delete()
        const help = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Prefix- `,`')
        .setAuthor('Command List', message.author.displayAvatarURL())

        .addFields(
        {
            name: 'Amusement',
            value: ' `meme` |`message`| `pic`|  ',
        },
        {
            name: 'Administration',
            value: '`kick`|`ban`|`mute`|`unmute`|`tempmute`|`clear`'
        },
        {
            name: 'Utilitaires',
            value: '`help`'


        },)
        

        

        message.channel.send(help)
    }
}

module.exports.config = {
    name: 'help'
}