import {app, BrowserWindow} from 'electron';

import reportExceptions from './features/reportExceptions.js';
import windowWrapper from './windowWrapper.js';
import {enforceSingleInstance, restoreFirstInstance} from './features/singleInstance.js';
import environment from "./environment.js";
import enableContextMenu from './features/contextMenu.js';
import runAtLogin from './features/openAtLogin.js';
import setupTrayIcon from './features/trayIcon.js';
import keepWindowState from './features/windowState.js';
import externalLinks from './features/externalLinks.js';
import badgeIcons from './features/badgeIcon.js';
import closeToTray from './features/closeToTray.js';
import setAppMenu from './features/appMenu.js';
import overrideUserAgent from './features/userAgent.js';
import setupOfflineHandlers from './features/inOnline.js';
import handleNotification from './features/handleNotification.js';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;
let trayIcon = null;

// Features
reportExceptions();

if (enforceSingleInstance()) {
  app.whenReady()
    .then(() => {
      overrideUserAgent();
      mainWindow = windowWrapper(environment.appUrl);
      setupOfflineHandlers(mainWindow);

      trayIcon = setupTrayIcon(mainWindow);
      setAppMenu(mainWindow);
      restoreFirstInstance(mainWindow);
      keepWindowState(mainWindow);
      runAtLogin(mainWindow);
      enableContextMenu();
      badgeIcons(mainWindow, trayIcon);
      closeToTray(mainWindow);
      externalLinks(mainWindow);
      handleNotification(mainWindow);
    })
}

app.setAppUserModelId('com.electron.google-chat');

app.on('window-all-closed', () => {
  app.exit();
});

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show();
  }
});
