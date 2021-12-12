//Pour le bot fonctionne
const Discord = require('discord.js');
const config = require('./config.json')
const { prefix } = config
const fs = require('fs'); 
const client = new Discord.Client 



//message commande handeler
client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files ) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === 'js');
    if(jsfile.length <= 0) {
        console.log('Aucune commande a été trouvée dans le HANDLER !')
    }

    jsfile.forEach((f, i) => {
        let props =require(`./commands/${f}`);
        console.log(`${f}✅`)
        client.commands.set(props.config.name, props)
    })
})

//Commande handeler
client.on("message", async message => {
    try {
      if (message.channel.type === 'dm') return;
      const user = message.mentions.users.first()
      if(user && user.id == client.user.id) message.channel.send(`<help`)
      if (!message.content.startsWith(prefix)) return;
      
      let messageArray = message.content.split(" ");
      let command = messageArray[0];
      let args = messageArray.slice(1);
      let commandFile = client.commands.get(command.slice(prefix.length))
      if(commandFile) commandFile.run(client, message, args)
     
    } catch (err) {
      message.channel.send("Une erreur s'est produite")
    }
})

//joue a...
client.on("ready", async () => {
    console.log('Commandes enregistré mise en ligne du bot... FINI!')
   
    let statuses = [
        
        `Je suis sur ${client.guilds.cache.size} serveur officiel!`,
        'd!help',
        '1+1=3'
    ];
    
    setInterval(() => {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "STREAMING"})
    }, 5000);
})

    // Create an event listener for messages
client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === '<pic') {
      // Send the user's avatar URL
      message.reply(message.author.displayAvatarURL());
    }
  });
  
client.login(config.token)