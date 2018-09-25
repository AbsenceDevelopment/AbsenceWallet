const electron = require("electron");
const {autoUpdater} = require("electron-updater");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1440, height: 1024, frame: false });
  app.setName("Absence Wallet");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", function(){
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();

  var template = [{
      label: "Application",
      submenu: [
          { label: "About", accelerator: "Command+I", click: function() { shell.openExternal('http://absence.one'); }},
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];

  let menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('updateReady');
});


ipcMain.on("quitAndInstall", (event, arg) => {
  autoUpdater.quitAndInstall();
})
