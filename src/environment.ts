import {app} from "electron";
import urls from './urls.js';

// Note: don't try to load this file in renderer process

export default Object.freeze(Object.assign({
  isDev: !app.isPackaged,
}, urls));
