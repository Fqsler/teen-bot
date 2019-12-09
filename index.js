const http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fs = require("fs");
const db = require('quick.db');

//Discord Bot
const botconfig = require("./config/botconfig.json");
const Discord = require("discord.js");
const promisify = require("util");
const bot = new Discord.Client()
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    if (file.split(".").slice(-1)[0] !== "js") return;

    const f = require(`./commands/${file}`);
    bot.commands.set(f.conf.name, f);
    const commandName = file.split(".")[0];

    console.log(`Загрузка команды ${commandName}`);


  });
});
bot.on("message", async message => {
  if(message.author.bot) return;//Если автор другой бот - нет.
  if(message.channel.type == "dm") return;//Если команда в личку - нет.

  var prefix = "!";//Устанавливаем префикс комманд боту
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!message.content.startsWith(prefix)) return;
  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))

  if(commandfile) commandfile.run(bot,message,args)
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    if (file.split(".").slice(-1)[0] !== "js") return;

    const event = require(`./events/${file}`);
    const eventName = file.split(" ")[0];
    const eName = file.split(" ")[1];

    console.log(`Загрузка ивента ${eventName + " " + eName}`);

    bot.on(eventName, event.bind(null, bot));
  });
  
});

bot.login(process.env.TOKEN);
//Glitch
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get("/", (request, response) => {
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Запускаем приложение
app.set('port', process.env.DEFPORT);//Задаём порт
var listener = app.listen(app.get('port'), function() {//Активация приложения
  setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 280000);
  console.log('Приложение было успешно запущено на порту ' + listener.address().port);//Выводим сообщение об успешной активации
});
