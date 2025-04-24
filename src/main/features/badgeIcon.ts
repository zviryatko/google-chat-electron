import {ipcMain, app, nativeImage, BrowserWindow, Tray} from 'electron';
import path from 'path';

type IconTypes = 'offline' | 'normal' | 'badge';

// Decide app icon based on favicon URL
const decideIcon = (href: string): IconTypes => {
  let type: IconTypes = 'normal';

  if (href.match(/offline/)) {
    type = 'offline';
  } else if (href.match(/new_notif/)) {
    type = 'badge';
  }

  return type;
}

export default (window: BrowserWindow, trayIcon: Tray) => {

  ipcMain.on('faviconChanged', (evt, href) => {
    const type = decideIcon(String(href));

    const size = 32;
    const icon = nativeImage.createFromPath(path.join(app.getAppPath(), `resources/icons/${type}/${size}.png`))
    trayIcon.setImage(icon);
  });

  ipcMain.on('unreadCount', (event, count: number) => {
    app.setBadgeCount(Number(count))
  });

  ipcMain.on('onlineStatus', (event, isOnline: boolean) => {
    const type = isOnline ? 'normal' : 'offline';
    const size = 32;
    const icon = nativeImage.createFromPath(path.join(app.getAppPath(), `resources/icons/${type}/${size}.png`))
    trayIcon.setImage(icon);
  })
}
