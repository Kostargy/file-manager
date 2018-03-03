const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

const {app, BrowserWindow, Menu, ipcMain} = electron;
const dialog = app.dialog;

process.env.NODE_ENV = 'test';


let mainWindow;
let addWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1000,
    heigth: 900,
    title: 'File Manager',
    resizable: false,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));


  mainWindow.on('closed', function() {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Load Vector',
        click(){
          loadVector();
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
]


if (process.env.NODE_ENV !=='production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
            focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });
}


function loadVector() {
  console.log("load from file");
}
