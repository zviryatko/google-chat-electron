import {app} from "electron";

const appUrl = 'https://mail.google.com/chat/u/0';

export default Object.freeze(Object.assign({
  isDev: !app.isPackaged,
  appUrl,
  logoutUrl: 'https://www.google.com/accounts/Logout?continue=' + appUrl
}));
