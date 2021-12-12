const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "ban command",

    async run (bot, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("vous ne pouvez pas utliser cette commande!")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" "); //.ban <args(0) aka @member> | <args(1) aka reason>
        if (!reason) reason = "Pas de raison spécifié ";

        const embed = new Discord.MessageEmbed()
        .setTitle(`Vous avez été banni de **${message.guild.name}**`)
        .setDescription(`Reason: ${reason}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        if (!args[0]) return message.channel.send("Vous devez spécifier un utilisateur à bannir! Essayez comme ça d!ban @user");

        if(!mentionMember) return message.channel.send("Cet utilisateur n'est pas un utilisateur valide / n'est plus sur le serveur !");

        if(!mentionMember.bannable) return message.channel.send("Je n'ai pas pu bannir cet utilisateur !");

        await mentionMember.send(embed);
        await mentionMember.ban({
            reason: reason
        }).then(() => message.channel.send("Cette personne a bien été ban: " + mentionMember.user.tag));
        
    }
}
 
module.exports.config = {
    name: 'ban'
}
