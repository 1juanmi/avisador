const electron = require("electron");
const sound = require("sound-play");
const tmi = require("tmi.js");
const axios = require("axios");
const path = require("path");
let lastmessage = new Date();

var time = 0;
var volume = 0.5;

const options = {
  options: {
    //debug: true,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: "justinfan123",
    password: "kappa",
  },
  channels: [""],
};
console.log(options.identity.username);
var client //= new tmi.client(options);

function inicializar() {
  client.on("chat", (target, ctx, message, self) => {
    // ignore messages from the bot
    if (self) return;
    const commandName = message.trim();
    //console.log(target);
    //console.log(ctx);
    if ((new Date().getTime() - lastmessage.getTime()) / 1000 > time) {
      //client.say(target, "test");
      console.log("sonido, volumen: " + volume);
      
      sound.play(path.join(__dirname, "sonido.mp3"), (volume)/100).catch(console.log);
      console.log(path.join(__dirname, "sonido.mp3"));
      sound.play(path.join(__dirname, "../../sonido/sonido.mp3"),(volume)/100).catch(console.log);
      //sound.play("C:\\Windows\\Media\\Windows Notify System Generic.wav");
    }

    lastmessage = new Date();

  });
}

async function check_user(user){
  try {
      await axios.get("https://avatars.antonioma.com/api/twitch/" + user);
      return true;
  } catch (error) {
    return false;
  } 
}

async function setconfig(_name, _time) {
  if (!await check_user(_name)) {

console.log("usuario no encontrado");
    electron.dialog.showMessageBox({
    title: "Error",
    type: "info",
    buttons: ["OK"],
    message: "El canal no existe \n",
    })

return;
  }

  options.channels = [_name];
  delete client;
  client = new tmi.client(options);
  client.disconnect().catch(_=>{});
  inicializar();
  time = _time;
  console.log("Config set to " + _name + " " + time);
  //client.connect();

}

module.exports = {
  start: (_) => client.connect().catch(e =>{console.error(e);
    electron.dialog.showMessageBox({
    title: "Alerta",
    type: "info",
    buttons: ["OK"],
    message: "error al iniciar \n"+e,
    })}
  ),
  stop: (_) => client.disconnect().catch(e=>{console.error(e),
    electron.dialog.showMessageBox({
    title: "Alerta",
    type: "info",
    buttons: ["OK"],
    message: "error al finalizar \n"+e,
  })}
  ),
  setconfig,
  setVolume: (vol) => {
    volume = vol;
  },
};
