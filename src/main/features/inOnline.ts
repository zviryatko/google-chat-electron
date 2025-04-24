import {BrowserWindow, Notification, app, nativeImage, ipcMain} from 'electron';
import path from 'path';

export default (window: BrowserWindow) => {
  ipcMain.on('onlineStatus', (event, isOnline: boolean, skipNotification: boolean) => {
    if (!isOnline) {
      window.loadURL(`file://${path.join(app.getAppPath(), 'src/offline/index.html')}`);
      if (!skipNotification) {
        showOfflineNotification(window);
      }
    }
  });
  window.on('show', () => {
    ipcMain.emit('app:checkIfOnline');
  });
}

const showOfflineNotification = (window: BrowserWindow) => {
  const notification = new Notification({
    title: 'Google Chat',
    body: `You are offline.\nCheck your internet connection.`,
    silent: true,
    timeoutType: 'default',
    icon: nativeImage.createFromPath(path.join(app.getAppPath(), 'resources/icons/normal/256.png'))
  });

  notification.on('click', () => {
    window.show();
    notification.close();
  });

  notification.show();
}
