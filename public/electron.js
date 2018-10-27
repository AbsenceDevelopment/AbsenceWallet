const electron = require("electron");
const {autoUpdater} = require("electron-updater");
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const shell = electron.shell;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    minWidth: 1100,
    height: 700,
    minHeight: 700,
    frame: false
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", function(){
  createWindow();
  if (isDev) {
    var mainMenu = [{
        label: "Application",
        submenu: [
            { label: "About", accelerator: "CommandORCtrl+I", click: function() { shell.openExternal('http://absence.one'); }},
            { label: "Check For Updates", accelerator: "CommandORCtrl+U", click: function() { autoUpdater.checkForUpdates() }},
            { label: "Go be developer", accelerator: "CommandORCtrl+Shift+i", click: function() { mainWindow.webContents.openDevTools() }},
            { type: "separator" },
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
  }else{
    var mainMenu = [{
        label: "Application",
        submenu: [
            { label: "About", accelerator: "Command+I", click: function() { shell.openExternal('http://absence.one'); }},
            { label: "Check For Updates", accelerator: "Command+U", click: function() { autoUpdater.checkForUpdates() }},
            { type: "separator" },
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
  }
  let menu = Menu.buildFromTemplate(mainMenu);

  Menu.setApplicationMenu(menu);
  const page = mainWindow.webContents;

  page.once('did-frame-finish-load', () => {
    autoUpdater.checkForUpdates();
  });
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

autoUpdater.on('update-available', (info) => {
  mainWindow.webContents.send('updateAvailable');
});

autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('updateReady');
});

autoUpdater.on('update-not-available', (info) => {
  mainWindow.webContents.send('updateNotReady');
})
autoUpdater.on('error', (err) => {
  mainWindow.webContents.send('error');
})

ipcMain.on("quitAndInstall", (event, arg) => {
  if (mainWindow !== null) {
    mainWindow.close()
  }
  autoUpdater.quitAndInstall(false);
})
