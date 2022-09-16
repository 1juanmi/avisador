const {contextBridge,ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld("electronApi", {
  start: () => {
    ipcRenderer.send("start");
  },
  end: () => {
    ipcRenderer.send("stop");
  },
  saveconf: (name, time) => {
    ipcRenderer.send("setconfig", name, time);
  },
  setVolume: (volume) => {
    ipcRenderer.send("setVolume", volume);
  },
});