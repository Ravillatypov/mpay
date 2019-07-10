'use strict'

import { app, BrowserWindow, Menu } from 'electron'
import log from 'electron-log'
const {shell} = require('electron')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 550,
    useContentSize: true,
    width: 600,
    webPreferences: {webSecurity: false}
  })

  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  var template = [{
    label: 'Правка',
    submenu: [
      { label: 'Отменить', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Повторить', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { label: 'Вырезать', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Скопировать', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Вставить', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Выбрать все', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
    ]},
  {
    label: 'Дополнительно',
    submenu: [
      {
        label: 'Открыть инструменты разработчика',
        click () { mainWindow.webContents.openDevTools() }
      },
      {
        label: 'Открыть папку логами',
        click () { shell.showItemInFolder(log.transports.file.findLogPath()) }
      }
    ]},
  {
    label: 'Справка',
    submenu: [
      { label: 'О приложении', click () { shell.openExternal('https://github.com/Ravillatypov/mpay') } }
    ]}
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
