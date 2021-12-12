const {Message, MessageEmbed}= require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'mute',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas les perm pour utiliser cette commande")
       
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        
        if(!Member) return message.channel.send('**Veuillez mentioner un membre! Par ex: d!mute @USER**')
        
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send("Le role **mute** n'a pas été **trouvé**! Je tente de le *créer*")

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
                message.channel.send('Le role Mute a bien été crée.')
            } catch (error) {
                console.log(error)
                message.channel.send("Une erreur est survenu!")
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} A déja été mute!`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} est maintenant mute.`)
    }
}

module.exports.config = {
    name: 'mute'
}