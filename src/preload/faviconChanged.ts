import {ipcRenderer} from 'electron';

let previousHref: null | string = '';
const emitFaviconChanged = (favicon: HTMLLinkElement) => {
  const href = favicon?.href || '';
  if (previousHref === href) {
    return;
  }
  previousHref = href;
  ipcRenderer.send('faviconChanged', href);
}

const observerCallback = (mutationsList: MutationRecord[]) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      const favicon = document.head.querySelector('link[rel*=icon]');
      if (favicon) {
        emitFaviconChanged(favicon as HTMLLinkElement);
      }
    }
  }
}

const initObserver = () => {
  const observer = new MutationObserver(observerCallback);
  observer.observe(document.head, { childList: true, attributes: true, subtree: true });
}

window.addEventListener('DOMContentLoaded', () => {
  initObserver();
});
