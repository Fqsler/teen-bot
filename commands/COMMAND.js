module.exports.run = (bot, message, args) => {
const Discord = require("discord.js");
const db = require('quick.db');

try {

  //CODE

} catch (err) {
  const channel = bot.guilds.get('600994717270016012').channels.get('564839199870550027');
  channel.send("**ERROR** " + err.name + `\n\`${err.message}\``);
  message.channel.send("\`Ошибка при чтении исходного файла команды.\`");
};
};

module.exports.conf = {
  name: "COMMAND",
  command: "COMMAND DESCRIPTION"
}
