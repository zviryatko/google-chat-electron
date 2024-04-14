import unhandled from 'electron-unhandled';
import log from 'electron-log';

export default () => {
  unhandled({
    logger: log.error,
  });
}
