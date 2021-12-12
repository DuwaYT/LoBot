const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'tempmute',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas les perms pour utiliser cette commande")
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send("Le membre n'a pas été trouvé. ")
        if(!time) return message.channel.send('Veuillez Spécifier un temps (mettez une maj par ex: d!tempmute @user 10D/M/S)')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send("Le role mute n'a pas été trouvé! Je tente de le créer... ")

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Mute role a été crée.')
            } catch (error) {
                console.log(error)
                message.channel.send("une erreur est survenue")
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} A déjà été mute.`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} est mainteant mute.`)

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`${Member.displayName} est maintenant unmute`)
        }, ms(time))
    }
}

module.exports.config = {
    name: 'tempmute'
}