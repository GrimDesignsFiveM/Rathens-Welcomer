const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    
   let hEmbed = new Discord.RichEmbed()
   .setTitle("Hattori Hanzo Invite")
   .setDescription(`<@${message.author.id}>` + " Sorry but at this time for the safety of this project and the people associated with it \n to invite me to your server you must be given a link by a dveloper")
   .setColor("0x0ffff")
    .setFooter(`Hattori Hanzo`, `https://cdn.discordapp.com/avatars/544049582959755264/b5f7f7b81321f647ff62c991871bae43.png?size=2048?size=1024`)
   .setThumbnail(`https://cdn.discordapp.com/avatars/544049582959755264/b5f7f7b81321f647ff62c991871bae43.png?size=2048?size=1024`);
   message.channel.send(hEmbed)
   message.delete().catch() 
}   
 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
exports.help = {
    name: 'invite',
    description: 'Generates a invite link',
    usage: 'gen invite',
    group: 'Help'
  };
