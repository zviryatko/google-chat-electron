import AutoLaunch from 'auto-launch';
import {app, BrowserWindow} from 'electron';
import store from '../config.js';
import environment from "../environment.js";

let autoLaunchInstance: AutoLaunch;

const autoLaunch = (): AutoLaunch => {
  if (autoLaunchInstance) {
    return autoLaunchInstance;
  }

  autoLaunchInstance = new AutoLaunch({
    name: app.getName(),
    isHidden: true,
    mac: {
      useLaunchAgent: true
    }
  });

  return autoLaunchInstance;
}

export default (window: BrowserWindow) => {
  if (environment.isDev) return;

  autoLaunchInstance = autoLaunch();

  if (!store.get('app.autoLaunchAtLogin')) {
    autoLaunchInstance.disable();
    return
  }

  if (app.commandLine.hasSwitch('hidden')) {
    window.hide();
  }

  autoLaunchInstance.isEnabled()
    .then((isEnabled) => {
      if (!isEnabled) {
        autoLaunchInstance.enable();
      }
    });
}

export {autoLaunch};
