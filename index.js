const electron = require("electron");
const sound = require("sound-play");
const tmi = require("tmi.js");
let lastmessage = new Date();



const options = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: "justinfan123",
    password: "kappa",
  },
  channels: ["1jmt"],
};
console.log(options.identity.username);
const client = new tmi.client(options);

client.connect();
client.on("chat", (target, ctx, message, self) => {
  // ignore messages from the bot
  if (self) return;
  const commandName = message.trim();
  console.log(target);
  console.log(ctx);
  if ((new Date().getTime() - lastmessage.getTime()) / 1000 > 1) {
    client.say(target, "test");
    sound.play("C:\\Windows\\Media\\Windows Notify System Generic.wav");
  }

  lastmessage = new Date();
});
