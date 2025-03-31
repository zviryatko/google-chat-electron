import path from 'path';
import {app, BrowserWindow, Menu, nativeImage, Tray} from 'electron';

export default (window: BrowserWindow) => {
  const size = 32;
  const trayIcon = new Tray(nativeImage.createFromPath(path.join(app.getAppPath(), `resources/icons/offline/${size}.png`)));

  const handleIconClick = () => {
    const shouldHide = (window.isVisible() && window.isFocused());

    if (shouldHide) {
      window.hide()
    } else {
      window.show()
    }
  }

  const handleIconDoubleClick = () => {
    window.show();
    window.focus();
  }

  trayIcon.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Toggle',
      click: handleIconClick
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        // The running webpage can prevent the app from quiting via window.onbeforeunload handler
        // So lets use exit() instead of quit()
        app.exit()
      }
    }
  ]));

  trayIcon.setToolTip('Google Chat');
  trayIcon.on('click', handleIconClick);
  trayIcon.on('double-click', handleIconDoubleClick);

  return trayIcon;
}
