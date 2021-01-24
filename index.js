const Discord = require("discord.js");
const bot = new Discord.Client();
const cheerio = require("cheerio");
const request = require("request");
const menemQuotes = require("menemQuotes");

var version = "1.3";

const token = "NzY4MzIzNTUwNDU2MDUzNzgx.X4-zEQ.RLnLQNmoM27MwkQ7p69a56Ljfkc";
const PREFIX = "!";

bot.on("ready", () => {
  console.log("Bot online");
  console.log("Menem Quotes esta funcionando normalmente");
});

bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "menem":
      image(message);

      break;
  }
});

bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "dolar":
      message.reply("El dolar sigue estando en 1$ muchachos, viva menem!");

      break;
  }
});

bot.on("message", (msg) => {
  if (msg.content === "Gracias carlitos") {
    msg.reply("De nada, wachin!");
  }
});

bot.on("message", (message) => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "frase":
      message.reply(menemQuotes.random());

      break;
  }
});

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

bot.login(token);
