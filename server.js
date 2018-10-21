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
// http://disboard-tet.glitch.me

// BOT
const Discord = require('discord.js');
//const richEmbed = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

let prefix = process.env.PREFIX;

client.on('ready', () => {
  console.log('Tet iniciado');
  /*client.user.setPresence({
       status: "online",
       game: {
           name: "『 Disboard 』",
           type: "PLAYING" // WATCHING
       }
   });*/
  client.user.setActivity('『 Disboard 』');

});

client.on('message', async message => {
  
  if(message.author.bot) return;
  
  if(message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
   let ping = Math.floor(message.client.ping);
   // let ping = Math.round(message.client.ping);
   message.channel.send(':ping_pong: Latencia: `'+ping+' ms.`'); 
  }
  
  if (command === "tag") {
    message.channel.send({
      embed: {
        color: config.color,
        description: "- Tag:**『 』**\n- Tag secundario: _(espacio en blanco)_\n- Tag terciario: **DB** (solo en caso de no poder escribir el primario)\n- Nombre: **Disboard**"    
      } 
    });
  }
  
  if (command === "tabla") {
    message.channel.send({
      embed: {
        color: config.color,
        description: "Tag: **『 』**\n\nGenerador: [https://hlorenzi.github.io/mk8d_ocr/table.html](https://hlorenzi.github.io/mk8d_ocr/table.html)"    
      } 
    });
  }
  
  if (command === "disboard") {
    let imanity = message.guild.members.filter(member => { 
        return member.roles.find("name", "Imanity");
    }).map(member => {
        return member.user.username;
    })
    let seirens = message.guild.members.filter(member => { 
        return member.roles.find("name", "Seirens");
    }).map(member => {
        return member.user.username;
    })
    let werebeast = message.guild.members.filter(member => { 
        return member.roles.find("name", "Werebeast");
    }).map(member => {
        return member.user.username;
    })
    message.channel.send({
      embed: {
        "color": config.color,
        "title": "**Listado de miembros**",
        "thumbnail": {
          "url": message.guild.iconURL
        },
        "fields": [          
          {
            "name": "Miembros",
            "value": imanity.join("\n"),
            "inline": true
          },
          {
            "name": "Allys",
            "value": werebeast.join("\n"),
            "inline": true
          },
          {
            "name": "Trials",
            "value": seirens.join("\n"),
            "inline": true
          },
          {
            "name": "**Enlaces**",
            "value": "-",
          },
          {
            "name": "Web",
            "value": "https://disboard.team",
            "inline": true
          },
          {
            "name": "Twitter",
            "value": "https://twitter.com/DisboardMK",
            "inline": true
          }
        ]
      } 
    });
  }
  
  if (command === "wars") {  
    let date = new Date();
    message.channel.send({
      embed: {
        "color": config.color,
        "title": "Wars disputadas: **_pendiente_**",
        "thumbnail": {
          "url": message.guild.iconURL
        },
        "fields": [
          {
            "name": "Victorias",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "Derrotas",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "Empates",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "% de victorias",
            "value": "_pendiente_",
            "inline": true
          }
        ]
      } 
    });
  }
  
  if (command === "info") {  
    let joinedTimestamp = message.guild.joinedTimestamp;
    let date = new Date(joinedTimestamp);
    
    message.channel.send({
      embed: {
        color: config.color,
        description: "Miembro desde: " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear().toString().substr(2,2) + "\n\n_Próximamente: estadísticas del jugador_",
        "thumbnail": {
          "url": message.author.avatarURL
        },
        "author": {
          "name": message.author.username
        },
        "fields": [
          {
            "name": "Wars jugadas",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "Media",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "Victorias",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "Derrotas",
            "value": "_pendiente_",
            "inline": true
          }          
        ]
      }
      
    });
  } 
  
  if (command === "r") {
    let gifs = [
      "https://i.pinimg.com/originals/86/bb/66/86bb66cb4f524bef1f7bc1e45733cfe7.gif",
      "https://media.giphy.com/media/MJDBXJ2PtgkEg/giphy.gif",
      "https://media.giphy.com/media/CO9pHUyGzEoH6/giphy.gif",
      "https://media.giphy.com/media/FAEj6nbeR1SCI/giphy.gif",
      "https://media.giphy.com/media/uEV4RB1fjv3AA/giphy.gif",
      "https://media.giphy.com/media/FGbEffWs9la1O/giphy.gif",
      "https://media.giphy.com/media/QcT4JVFDn4WEU/giphy.gif",
      "https://media.giphy.com/media/kXFpgStKE2Ypi/giphy.gif",
      "https://media.giphy.com/media/YdXoD3Kk0pxw4/giphy.gif",
      "https://media0.giphy.com/media/CphBpuaoIjwk0/giphy.gif",
      "https://media.giphy.com/media/fGepS5ZgnsMNi/giphy.gif",
      "https://media.giphy.com/media/MOTwD54jp6d9u/giphy.gif",
      "https://media.giphy.com/media/nf0TvJDBOTfjy/giphy.gif",
      "https://media.giphy.com/media/gHMpcRSayJu8w/giphy.gif",
      "https://media.giphy.com/media/8i24nfqlvkmB2/giphy.gif",
      "https://media.giphy.com/media/SaiULvpd3yQow/giphy.gif",
      "https://media.giphy.com/media/fQF0FrBcSHKsU/giphy.gif",
      "https://media.giphy.com/media/2SRXHjVfsXAYw/giphy.gif"
    ];
    
    let videos = [
      "https://media.giphy.com/media/Iv9a7T9pn38sw/giphy-hd.mp4"
    ]
    let rand = Math.floor(Math.random() * gifs.length);    
    message.channel.send({
      embed: {
        color: config.color,
        "image": {
          "url": gifs[rand]
        }  
      } 
    });
  } 
  
  // Si +aschente werebeast o si +aschente immanity, ver k roles tiene, segun uno u otro, mostrar un mensaje u otro
  
  if (command === "help") {    
    message.channel.send({
      embed: {
        color: config.color,
        description: "Bot de ayuda general\n\n**+tag** -> Referencias al clan\n**+tabla** -> Información para hacer correctamente las tablas\n**+info** -> Información del jugador\n**+wars** -> Informe de wars\n**+disboard** -> Datos del clan\n**+r** -> Gifs random de NGNL\n**+help** -> Lista de comandos disponibles"    
      } 
    });
  } 
  
  
  if (!(command === "ping" || command === "tag" || command === "help" || command === "r" || command === "tabla" || command === "info" || command === "disboard" || command === "wars")) {   
    message.channel.send({
      embed: {
        color: config.color,
        description: "**Tet no reconoce tu comando**.\nTet sigue aprendiendo, pronto tendrá más comandos que ofrecer."    
      } 
    });
  }
  
});

client.login(process.env.TOKEN);