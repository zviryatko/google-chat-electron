import path from 'path';
import {app, BrowserWindow, nativeImage} from 'electron';

export default function (url: string) {
  const window = new BrowserWindow({
    webPreferences: {
      autoplayPolicy: 'user-gesture-required',
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: false,
      disableBlinkFeatures: 'Auxclick',
      preload: path.join(app.getAppPath(), 'lib/renderer/index.js'),
    },
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png')),
    show: false,
    minHeight: 570,
    minWidth: 400,
    center: true,
    title: app.getName(),
    backgroundColor: '#E8EAED',
    fullscreenable: false,
  });

  window.once('ready-to-show', () => {
    window.show();
  });

  window.loadURL(url);

  return window;
};