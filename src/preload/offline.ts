import {ipcRenderer} from 'electron';
import urls from "./urls.js";

const triggerOnlineOffline = (online: boolean) => {

  if (online) {
    window.location.replace(urls.appUrl)
  } else {
    window.location.reload();
  }
  ipcRenderer.send('onlineStatus', online);
}

const isOnline = () => triggerOnlineOffline(window.navigator.onLine || false);
// Listen to global event from offline.html
window.addEventListener('app:checkIfOnline', isOnline);
window.addEventListener('online', () => triggerOnlineOffline(true));
window.addEventListener('offline', () => triggerOnlineOffline(false));
