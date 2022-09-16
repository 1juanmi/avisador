const { app, BrowserWindow,ipcMain } = require("electron");
const {start,stop,setconfig,setVolume} = require("./index.js");
const path = require("path");
const url = require("url");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //win.loadFile("index.html");

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"), // relative path to the HTML-file
      protocol: "file:",
      slashes: true,
    })
  );
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.on("start",start);
  ipcMain.on("stop",stop);
  ipcMain.on("setconfig",(event,name,time)=>setconfig(name,time));
  ipcMain.on("setVolume",(event,volume)=>setVolume(volume));

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
