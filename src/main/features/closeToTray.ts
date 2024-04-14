import {BrowserWindow, app} from 'electron';

let willQuit = false;

export default (window: BrowserWindow) => {

  // Allow Mac users to exit from app via Dock context menu "Quit" item
  app.on('before-quit', () => {
    willQuit = true
  })

  window.on('close', (event) => {
    if (!willQuit) {
      event.preventDefault();

      window.hide();
    }
  })
}
