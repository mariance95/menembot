const Discord = require("discord.js");
const bot = new Discord.Client();
const cheerio = require("cheerio");
const request = require("request");
const menemQuotes = require("menemQuotes");
const https = require("https");
const config = require("./secrets.json");

// JOKER?
// const jokeURL = "https://v2.jokeapi.dev/joke/Any?lang=es";
// function jokeAPI() {
//   https.get(jokeURL.joke);
// }

// DISCORD API NO TOCAR
var version = "1.3";
const PREFIX = "!";

// BOT ON
bot.on("ready", () => {
  console.log("Bot online");
  console.log("Menem Quotes esta funcionando normalmente");
});
bot.login(config.token);

// !menem
bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "menem":
      image(message);
      console.log("Se pidio una imagen");

      break;
  }
});

// !dolar
bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "dolar":
      message.reply("El dolar sigue estando en 1$ muchachos, viva menem!");
      console.log("Se pidio precio del Dolar");

      break;
  }
});

// !chiste not working
// bot.on("message", (message) => {
//   let args = message.content.substring(PREFIX.length).split(" ");
//
//   switch (args[0]) {
//     case "chiste":
//       message.reply(jokeAPI());
//       console.log("Se pidio un Chiste");
//       break;
//   }
// });

// !frase
bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "frase":
      message.reply("Yo una vez dije: " + menemQuotes.random());

      break;
  }
});

// GRACIAS CARLITOS
bot.on("message", (msg) => {
  if (msg.content === "Gracias carlitos") {
    msg.reply("De nada, wachin!");
  }
});

// Get Image
function image(message) {
  var options = {
    url: "http://results.dogpile.com/serp?qc=images&q=" + "menem",
    method: "GET",
    headers: {
      Accept: "text/html",
      "User-Agent": "Chrome",
    },
  };

  request(options, function (error, response, responseBody) {
    if (error) {
      return;
    }

    $ = cheerio.load(responseBody);

    var links = $(".image a.link");

    var urls = new Array(links.length)
      .fill(0)
      .map((v, i) => links.eq(i).attr("href"));

    console.log(urls);

    if (!urls.length) {
      return;
    }

    // Send result
    message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
  });
}
