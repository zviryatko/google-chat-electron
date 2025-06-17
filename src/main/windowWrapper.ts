import path from 'path';
import {app, BrowserWindow, ipcMain, nativeImage, nativeTheme} from 'electron';
import store from './config.js';

export default (url: string): BrowserWindow => {
  const window = new BrowserWindow({
    webPreferences: {
      autoplayPolicy: 'user-gesture-required',
      contextIsolation: false,
      nodeIntegration: false,
      sandbox: false,
      disableBlinkFeatures: 'Auxclick', // Security
      preload: path.join(app.getAppPath(), 'lib/preload/index.cjs'),
    },
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png')),
    show: false,
    minHeight: 570,
    minWidth: 480,
    center: true,
    title: 'Google Chat',
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#28292a' : '#E8EAED',
    autoHideMenuBar: store.get('app.hideMenuBar'),
  });

  window.once('ready-to-show', () => {
    if (!store.get('app.startHidden')) {
      window.show();
    }
    window.webContents.session.setSpellCheckerEnabled( !store.get('app.disableSpellChecker') );
  });

  window.loadURL(url);
  window.webContents.once('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    ipcMain.emit('onlineStatus', false, true);
  });

  let ua = window.webContents.userAgent;
  ua = ua.replace(/google-chat-electron\/[0-9\.-]*/,'');
  ua = ua.replace(/Electron\/*/,'');
  window.webContents.userAgent = ua;

  window.webContents.on('dom-ready', () => {
  })

  return window;
};
