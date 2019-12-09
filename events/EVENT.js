module.exports = async (bot, EVENT ARGS) => {
const Discord = require("discord.js");

try {

  //CODE

} catch (err) {
    const channel = bot.guilds.get('600994717270016012').channels.get('622499686301040645');
    channel.send("**ERROR in Log ChannelUpdate** " + err.name + `\n\`${err.message}\``);
};
};
