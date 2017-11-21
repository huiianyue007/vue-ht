export default {
  sessionKeys: [],
  storageKeys: [],
  init(storageKeys, sessionKeys, store, callback) {
    this.storageKeys = storageKeys;
    this.sessionKeys = sessionKeys;
    if (storageKeys.length) {
      this.initStorage(callback);
    }
    if (sessionKeys.length) {
      this.initSession(callback);
    }
    store.subscribe((mutations, state) => {
      if (sessionKeys.length) {
        this.sessionAsync(state);
      }
      if (storageKeys.length) {
        this.storeAsync(state);
      }
    });
  },
  initStorage(callback) {
    let storage = JSON.parse(window.localStorage.getItem('storeAsync'));
    let storageKeys = {};

    if (!storage || !this.storageKeys.length) {
      return false;
    }
    Object.entries(storage).filter((item) => {
      return this.storageKeys[item[0]] !== -1;
    }).forEach((item) => {
      storageKeys[item[0]] = item[1];
    });
    callback(storageKeys);
  },
  initSession(callback) {
    let session = JSON.parse(window.sessionStorage.getItem('storeAsync'));
    let sessionKeys = {};

    if (!session || !this.sessionKeys.length) {
      return false;
    }
    Object.entries(session).filter((item) => {
      return this.sessionKeys[item[0]] !== -1;
    }).forEach((item) => {
      sessionKeys[item[0]] = item[1];
    });
    callback(sessionKeys);
  },
  storeAsync(state) {
    let storage = {};

    Object.entries(state).filter((item) => {
      return this.storageKeys.indexOf(item[0]) !== -1;
    }).forEach((item) => {
      storage[item[0]] = item[1];
    });
    window.localStorage.setItem('storeAsync', JSON.stringify(storage));
  },
  sessionAsync(state) {
    let session = {};

    Object.entries(state).filter((item) => {
      return this.sessionKeys.indexOf(item[0]) !== -1;
    }).forEach((item) => {
      session[item[0]] = item[1];
    });
    window.sessionStorage.setItem('storeAsync', JSON.stringify(session));
  }
};
