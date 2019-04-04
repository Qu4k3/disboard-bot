const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();

function checkHttps(req, res, next){
  // protocol check, if http, redirect to https  
  if(req.get('X-Forwarded-Proto').indexOf("https")!=-1){
    return next()
  } else {
    res.redirect('https://' + req.hostname + req.url);
  }
}

app.all('*', checkHttps);

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
// http://disboard-bot.glitch.me

// BOT
const Discord = require('discord.js');
//const richEmbed = require('discord.js');
const client = new Discord.Client();
const guild = new Discord.Guild();
const config = require("./config.json");

let prefix = config.color;

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

  if (message.author.bot) return;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "ping" && args.length <= 0) {
    let ping = Math.floor(message.client.ping);
    message.channel.send(':ping_pong: Latencia: `' + ping + ' ms.`');
  } else if (command === "tag" && args.length <= 0) {
    message.channel.send({
      embed: {
        color: config.color,
        description: "- Tag: **`『 』`**\n- Tag secundario: _(espacio en blanco)_\n- Tag terciario: **DB** (solo en caso de no poder escribir el primario)\n- Nombre: **Disboard**"
      }
    });
  } else if (command === "tabla" && args.length <= 0) {
    message.channel.send({
      embed: {
        color: config.color,
        description: "- Tag: **`『 』`**\n- Generador: [https://hlorenzi.github.io/mk8d_ocr/table.html](https://hlorenzi.github.io/mk8d_ocr/table.html)\n_Ejemplo:_",
        "image": {
          "url": "https://cdn.discordapp.com/attachments/487343815615578124/503632252807413762/Screen_Shot_2018-10-21_at_1.14.33_PM.png"
        }
      }
    });
  } else if (command === "disboard" && args.length <= 0) {
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
    let lunamana = message.guild.members.filter(member => {
      return member.roles.find("name", "Lunamana");
    }).map(member => {
      return member.user.username;
    })
    message.channel.send({
      embed: {
        "color": config.color,
        "fields": [{
            "name": "**Jugadores de Mario Kart**",
            "value": ":busts_in_silhouette: - " + (imanity.length + seirens.length + werebeast.length),
          },
          {
            "name": "Miembros - " + imanity.length,
            "value": imanity.join("\n")+"\n-",
            "inline": true
          },
          {
            "name": "Trials - " + seirens.length,
            "value": seirens.join("\n")+"\n-",
            "inline": true
          },
          {
            "name": "Allys - " + werebeast.length,
            "value": werebeast.join("\n")+"\n-",
            "inline": true
          }/*,
          {
            "name": "**Jugadores de Smash**",
            "value": ":busts_in_silhouette: - " + (lunamana.length),
          },
          {
            "name": "Miembros - " + lunamana.length,
            "value": lunamana.join("\n")+"\n-",
            "inline": true
          }*/,
          {
            "name": "\n**Enlaces**",
            "value": ":link:",
          },
          {
            "name": "Web",
            "value": "https://disboard.team",
            "inline": true
          },
          {
            "name": "Twitter",
            "value": "https://twitter.com/DisboardTeam",
            "inline": true
          }
        ]
      }
    });
  } else if (command === "wars" && args.length <= 0) {
    let date = new Date();
    message.channel.send({
      embed: {
        "color": config.color,
        "title": "Wars disputadas: pendiente",
        "thumbnail": {
          "url": message.guild.iconURL
        },
        "fields": [{
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
  } else if (command === "info" && args.length <= 0) {
    let joinedTimestamp = message.guild.joinedTimestamp;
    let date = new Date(joinedTimestamp);

    message.channel.send({
      embed: {
        color: config.color,
        description: "Miembro desde: _pendiente_", // + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear().toString().substr(2, 2) + "\n\n_Próximamente: estadísticas del jugador_",
        "thumbnail": {
          "url": message.author.avatarURL
        },
        "author": {
          "name": message.author.username
        },
        "fields": [{
            "name": "Wars jugadas",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "Media pts.",
            "value": "_pendiente_",
            "inline": true
          },
          {
            "name": "Ratio V/D",
            "value": "_pendiente_",
            "inline": true
          }
        ]
      }
    });
  } else if (command === "info" && args.length == 1) {
    let usuario = message.mentions.members.first();
    
    if (usuario) {
      let joinedTimestamp = message.guild.joinedTimestamp;
      let date = new Date(joinedTimestamp);
      //date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear().toString().substr(2, 2)
      message.channel.send({
        embed: {
          color: config.color,
          description: "Miembro desde: _pendiente_\n\n_Próximamente: estadísticas del jugador_",
          "thumbnail": {
            "url": usuario.avatarURL
          },
          "author": {
            "name": usuario.username
          },
          "fields": [{
              "name": "Wars jugadas",
              "value": "_pendiente_",
              "inline": true
            },
            {
              "name": "Media pts.",
              "value": "_pendiente_",
              "inline": true
            },
            {
              "name": "Ratio V/D",
              "value": "_pendiente_",
              "inline": true
            }
          ]
        }
      });
    }
  } else if (command === "r" && args.length <= 0) {
    let gifs = [
      "https://i.pinimg.com/originals/86/bb/66/86bb66cb4f524bef1f7bc1e45733cfe7.gif",
      "https://media.giphy.com/media/MJDBXJ2PtgkEg/giphy.gif",
      "https://media.giphy.com/media/CO9pHUyGzEoH6/giphy.gif",
      "https://media.giphy.com/media/FGbEffWs9la1O/giphy.gif",
      "https://media.giphy.com/media/QcT4JVFDn4WEU/giphy.gif",
      "https://media.giphy.com/media/kXFpgStKE2Ypi/giphy.gif",
      "https://media0.giphy.com/media/CphBpuaoIjwk0/giphy.gif",
      "https://media.giphy.com/media/fGepS5ZgnsMNi/giphy.gif",
      "https://media.giphy.com/media/MOTwD54jp6d9u/giphy.gif",
      "https://media.giphy.com/media/nf0TvJDBOTfjy/giphy.gif",
      "https://media.giphy.com/media/gHMpcRSayJu8w/giphy.gif",
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
  } else if (command === "aschente" && args.length == 1) {
    
    let web_extra = "Al formar parte de Disboard, usamos todos tus resultados de wars para hacer estadísticas que puedes consultar a través de este bot `+help` o a través de la web https://disboard.team _[próximamente]_";
    
    let usuario = message.mentions.members.first();
    
    if (usuario) {
    
      if(usuario.roles.find("name", "Imanity")) {
         message.channel.send({
          embed: {
            color: config.color,
            description: "¡Bienvenid@ al clan de **Disboard** " + usuario + "!\n\nPor favor, tómate tu tiempo para leerte los <#487350168853676053> (normas) e <#488091660115247105> para entender un poco mejor el servidor.\n\nSi quieres, puedes presentarte en <#487380356874633217> para que te conozcamos todos un poco mejor.\n\n¡Esperamos que te sientas a gusto!"
          }
        });
        message.channel.send({
          embed: {
            color: 14161240,
            description: web_extra
          }
        });
       } else if(usuario.roles.find("name", "Seirens")) {
         message.channel.send({
          embed: {
            color: config.color,
            description: "¡Bienvenid@ al clan de **Disboard** " + usuario + "!\n\nPor favor, tómate tu tiempo para leerte los <#487350168853676053> (normas) e <#488091660115247105> para entender un poco mejor el servidor.\n\nSi quieres, puedes presentarte en <#487380356874633217> para que te conozcamos todos un poco mejor :)\n\nTras jugar algunas wars junto al equipo, los representantes pasarán a ponerte rol de miembro de clan.\n\n¡Esperamos que te sientas a gusto!"
          }
        });
        message.channel.send({
          embed: {
            color: 14161240,
            description: web_extra
          }
        });
       } else if(usuario.roles.find("name", "Werebeast")) {
         message.channel.send({
          embed: {
            color: config.color,
            description: "¡Bienvenid@ al clan de **Disboard** " + usuario + "!\n\nPor favor, tómate tu tiempo para leerte los <#487350168853676053> (normas) e <#488091660115247105> para entender un poco mejor el servidor.\n\n¡Esperamos que te sientas a gusto! Pásatelo bien y sobretodo, respeta las reglas y la forma de ser de este clan."
          }
        });
        message.channel.send({
          embed: {
            color: 14161240,
            description: web_extra
          }
        });
       } else {
         message.channel.send({
          embed: {
            color: config.color,
            description: "¡Bienvenid@ al clan de **Disboard** " + usuario + "!\n\nPor favor, tómate tu tiempo para leerte los <#487350168853676053> (normas) e <#488091660115247105> para entender un poco mejor el servidor.\n\nNo olvides presentarte en <#487380356874633217> para que te conozcamos todos un poco mejor :)"
          }
        });
        message.channel.send({
          embed: {
            color: 14161240,
            description: web_extra
          }
        });
       }   
    }
    
  } else if (command === "snl" && args.length <= 0) {
    
    let miembros = ["Aid3n", "Alozy", "eletrn02", "Javier", "kelin", "LaPulgaXD", "Little", "Quake", "Roger", "STpile", "Caizer", "YiYo"]
    
    let lista = "";
    
    for (let index = 0; index < miembros.length; ++index) {
        lista += miembros[index] + "\n"
    }
    
    message.channel.send({
      embed: {
        color: config.color,        
        "fields": [{
              "name": "Registrados",
              "value": miembros.length
            },
           {
              "name": "Pueden jugar",
              "value": lista
            }
          ]
      }
    });
  } 
  else if (command === "help" && args.length <= 0) {
    message.channel.send({
      embed: {
        color: config.color,
        description: "**+tag** --------------> Referencias al clan\n**+tabla** ------------> Información para hacer correctamente las tablas\n**+info** -------------> Información del jugador\n**+info @usuario** -> Información del jugador\n**+wars** ------------> Informe de wars\n**+disboard** -------> Datos del clan\n**+invi** -------------> Enlace de invitación\n**+r** ----------------> Gifs random de NGNL\n**+help** ------------> Lista de comandos disponibles"
      }
    });
  } else if (command === "invi" && args.length <= 0) {
    message.channel.send("https://discord.gg/YmFtq7m");
  } else {
    /*message.channel.send({
      embed: {
        color: config.color,
        description: "**Tet no reconoce tu comando**."
      }
    });*/
  }

});


client.login(process.env.TOKEN);