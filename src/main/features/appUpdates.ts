import {setUpdateNotification, checkForUpdates} from 'electron-update-notifier';
import store from '../config.js'

let interval: NodeJS.Timeout;

export default () => {
  clearInterval(interval);

  const shouldCheckForUpdates = () => {
    return store.get('app.autoCheckForUpdates');
  }

  // Runs once at startup
  setTimeout(() => {
    if (shouldCheckForUpdates()) {
      setUpdateNotification();
    }
  }, 5000)

  interval = setInterval(() => {
    if (shouldCheckForUpdates()) {
      checkForUpdates()
    }
  }, 1000 * 60 * 60 * 24);
}
