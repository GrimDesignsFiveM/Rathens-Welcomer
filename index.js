 /*
 * Code by Tyler. H#9393!!
 * Ninja Discord Modertion Bot v1.00
 *
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first violation in this term will result in a copyright strike or lawsuit
 *  If you fork this Bot repo make sure you give me credit for all files and folders associated as all the branding for this bot is registered and copy written. 
 *  Due to the fact that no license is provided with this bot that means that it falls under the not publicly available category.
*/

const Discord = require("discord.js");
const rathens = new Discord.Client;
const timers = require('timers')
const config = require('./config.json')
const welcome_channel = config.welcome_channel    
const leave_channel = config.leave_channel
const default_welcome = config.default_welcome
const default_leave = config.default_leave
const emojiID = config.embed_emoji
const logc = config.logchannel
const logc2 = config.logchannel2
const activity1 = config.activity1
const type1 = config.type1
const activity2 = config.activity2
const type2 = config.type2
const activity3 = config.activity3
const type3 = config.type3
const time1 = config.activitytime
const ownerID = config.ownerID
const customtext = config.customtext
//const etitle = config.embed_title
const guildconfig = config.embed_guildname
const ecolor = config.embed_color
const moment = require('moment');
const token = proces.env.BOT_TOKEN

////////////////////////////////////////////////////
/* If you are self hostig delete these lines and   /
add   "token": "Your_Token",                       /
      "prefix": "Your_Prefix",                     /
in the config.json */                              
const prefix = process.env.PREFIX;                   
const token = process.env.BOT_TOKEN;               
////////////////////////////////////////////////////

//Activites Const
let activities = [
  {
    name:`${activity1}`,
    options:{
      type:`${type1}`
    }
  },
  {
    name:`${activity2}`,
    options:{
      type:`${type2}`
    }
  },
  {
    name: `${activity3}`,
    options:{
      type:`${type3}`
    }
  }
]
let i = 0;
//On Ready
  rathens.on('ready', () => {
    console.log(`${rathens.user.username} has started, with ${rathens.users.size} users, in ${rathens.channels.size} channels of ${rathens.guilds.size} guilds.`);
    timers.setInterval(() => {
      i = i == activities.length ? 0 : i
      rathens.user.setActivity(activities[i].name, activities[i].options)
      i++
    }, time1)
  });

// Initialize the invite cache
const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

//This is the bots startup log output and playing status.
//rathens.on("ready",  async () => {
//console.log(`Bot has started, with ${rathens.users.size} users, in ${rathens.channels.size} channels of ${rathens.guilds.size} guilds.`); 
 // rathens.user.setGame(`nb/help in ${rathens.guilds.size} Servers`, `https://www.twitch.tv/monstercat`);

  // "ready" isn't really ready. We need to wait a spell.
  wait(1000); 

//////////////////////////////***SERVER INVITES CACHE FEATURE***////////////////////////////////////////////////
/* This event is required for loading all invites for all guilds and saving them to the cache. */
	
  rathens.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
// });

//////////////////////////////***MEMBER JOINED INVITE LOG***////////////////////////////////////////////////
/* This event logs what invte code was used when a member joins the server */
rathens.on('guildMemberAdd', member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = rathens.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.find(channel => channel.name === "invite-logs");
    // A real basic message with the information we need. 
 let iEmbed = new Discord.RichEmbed()
   .setTitle("Ninja Invite Logs")
   .setThumbnail("https://cdn.discordapp.com/avatars/595155471611068426/b6ffdf628b989aa8c55c446ff623042f.png?size=2048?size=1024")
   .setDescription(`<@${member.user.id}> Joined using the invite code below`)
   .setColor("#0x3dfbff")
   .addField("Member Tag", `${member.user.tag}`, true)
   .addField("Invite Code", `https://www.discord.gg/${invite.code}`, true)
   .addField("Invited By", `<@${inviter.id}>`, true)
   .addField("Code Used ", `${invite.uses} times since its creation.`, true)
   .setFooter("© Rathens Welcomer");
   logChannel.send(iEmbed);
  });
 });

  //On Message
  rathens.on("message", async message =>{
  if (message.content === `${prefix}add`)
  rathens.emit('guildMemberAdd', message.member);

  if (message.content === `${prefix}remove`)
  rathens.emit('guildMemberRemove', message.member);

   if (message.content === `${prefix}ping`)
  message.channel.send(`Hoold on!`).then(m => {
    m.edit(
      `:ping_pong: Wew, made it over the ~waves~ ! **Pong!**\nMessage edit time is ` +
        (m.createdTimestamp - message.createdTimestamp) +
        `ms, Discord API heartbeat is ` +
        Math.round(rathens.ping) +
        `ms.`
       );
    });
 });

//////////////////////////////////////////////////SUPPORT SERVER ONLY/////////////////////////////////////////////////////////
  rathens.on('guildMemberAdd', member => {
  let count = member.guild.memberCount.toString() 
  let end = count[count.length-1]
  let suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count + "th" 
  const channel = member.guild.channels.find(chnl => chnl.name === `${welcome_channel}`);
  const memberavatar = member.user.displayAvatarURL
     if (!channel) {
        console.log("Set channel name in config.");
        return;
      };
      const guildspot = guildconfig || member.guild
      const emojispot = ` ` || `${emojiID}`
      let rules = member.guild.channels.find("id", "627960820436828172")
      let str = `Welcome to **${guildspot}**! <@${member.user.id}>!, Make sure you read the ${rules} channel :thumbsup:`
      const embed = new Discord.RichEmbed()
      .setTitle("Member Joined :thinking: :eyes:")
      .setColor(ecolor)
      .setDescription(str)
      .setURL("https://discord.gg/tEkJP2b")
      .addField("User Tag", `${member.user.tag}`, true)
      .addField("User ID", `${member.user.id}`, true)
      .addField("You Are The", `${suffixed} Member`, true)
      .addField('Joined Discord', `${moment(member.user.createdAt).toString().substr(0, 15)}\n(${moment(member.user.createdAt).fromNow()})`, true)
      .addField('Joined Server', `${moment(member.user.joinedAt).toString().substr(0, 15)}\n(${moment(member.user.joinedAt).fromNow()})`, true)   
      .setThumbnail(memberavatar)
      .setFooter("© Rathens Welcomer")
      .setTimestamp();
      channel.send(embed);
  
  const logs = member.guild.channels.find(chnl => chnl.name === `${logc}`);
  logs.send(`> :inbox_tray: ${member} has Joined ${member.guild.name}.`)
});

rathens.on('guildMemberRemove', member => {
  let count = member.guild.memberCount.toString() 
  let end = count[count.length-1]
  let suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count
  const channel = member.guild.channels.find(chnl => chnl.name === `${leave_channel}`);
  const memberavatar = member.user.displayAvatarURL
     if (!channel) {
        console.log("Set channel name in config.");
        return; 
      }; 
      const guildspot = guildconfig || member.guild
      const emojispot = ` ` || `${emojiID}`
      let str = `RIP ${member.user.tag}! Just left the server :wave: :wave:`
      const embed2 = new Discord.RichEmbed()
      .setTitle("Member Left :shrug:")
      .setColor(ecolor)
      .setDescription(str)
      .setURL("https://discord.gg/tEkJP2b")
      .addField("User Tag", `${member.user.tag}`, true)
      .addField("User ID", `${member.user.id}`, true)
      .addField("We Now Have", `${suffixed} Members`, true)
      .addField('Joined Discord', `${moment(member.user.createdAt).toString().substr(0, 15)}\n(${moment(member.user.createdAt).fromNow()})`, true)
      .addField('Joined Server', `${moment(member.user.joinedAt).toString().substr(0, 15)}\n(${moment(member.user.joinedAt).fromNow()})`, true)   
      .setThumbnail(memberavatar)
      .setFooter("© Rathens Welcomer")
      .setTimestamp();
      channel.send(embed2);

  const logs = member.guild.channels.find(chnl => chnl.name === `${logc}`);
  logs.send(`> :outbox_tray: ${member} has left ${member.guild.name}.`)
});

//Bot Login Function (Required)
//Change to config.token if self hosting
//rathens.login(config.token)
rathens.login(process.env.BOT_TOKEN);

 /*
 * Code by Tyler. H#9393!!
 * Ninja Discord Modertion Bot v1.00
 *
 *  I DO NOT authorize you to use this bot or the corresponding code without my consent first violation in this term will result in a copyright strike or lawsuit
 *  If you fork this Bot repo make sure you give me credit for all files and folders associated as all the branding for this bot is registered and copy written. 
 *  Due to the fact that no license is provided with this bot that means that it falls under the not publicly available category.
*/
