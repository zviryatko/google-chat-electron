'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;

const TrayIcon = require('./features/trayIcon.js');
const WindowState = require('./features/windowState.js');
const ExternalLinks = require('./features/externalLinks.js');
const BadgeIcons = require('./features/badgeIcon.js');
const CloseToTray = require('./features/closeToTray.js');

// Garbage collection hack
let trayIcon = null;
let window = null;

module.exports = (url) => {
  window = new electron.BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      spellcheck: true,
      preload: path.join(app.getAppPath(), 'src/js/renderer.js'),
    },
    icon: path.join(app.getAppPath(), 'resources/icons/normal/256.png'),
    show: false,
    minHeight: 570,
    minWidth: 400,
    title: app.getName(),
    backgroundColor: '#ffffff',
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  window.loadURL(url);

  WindowState(window);
  trayIcon = TrayIcon(app, window);
  BadgeIcons(app, window, trayIcon);
  CloseToTray(app, window);
  ExternalLinks(window);

  return window;
};