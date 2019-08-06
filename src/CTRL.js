import * as Utils from './Utils';

const CTRL = {
  app: undefined,
  debug: false,
  reactNCLog: false,
  state: {},
  initialState: {},
  routing: {},
  log: (text) => { if(CTRL.debug) console.log(`React-nc: ${text}`); },
  forceUpdate: (...args) => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.app.forceUpdate(...args);
  },
  setState: (state, callback) => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.state = {
      ...CTRL.state,
      ...state
    };
    CTRL.forceUpdate(callback);
  },
  resetState: (callback) => {
    CTRL.state = Utils.deepCopy(CTRL.initialState);
    CTRL.forceUpdate(callback);
   },
  initializeState: state => {
    CTRL.initialState = state;
    CTRL.state = Utils.deepCopy(CTRL.initialState);
  },
  version: '1.2.9'
};

export default CTRL;
