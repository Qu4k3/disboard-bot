// SCRIPT DE ARRANQUE

const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);


// BOT

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('estoy listo!');
  client.user.setPresence({
       status: "online",
       game: {
           name: "-help | prueba bot",
           type: "PLAYING"
       }
   });

});

client.on('message', message => {

  if (message.content.startsWith("ping")) {
   let ping = Math.floor(message.client.ping);
   message.channel.send(':ping_pong: `'+ping+' ms.` server.'); 

  }
  
});

client.login(process.env.TOKEN);