import * as Utils from './Utils';

const CTRL = {
  app: undefined,
  debug: false,
  reactNCLog: false,
  state: {},
  initialState: {},
  routing: {},
  log: (text) => { if(CTRL.debug) console.log(`React-nc: ${text}`); },
  forceUpdate: () => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.app.forceUpdate();
  },
  setState: (state, callback) => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.state = {
      ...CTRL.state,
      ...state
    };
    if(typeof callback === 'function') {
      callback();
    }
    CTRL.forceUpdate();
  },
  resetState: () => {
    CTRL.state = Utils.deepCopy(CTRL.initialState);
    CTRL.forceUpdate();
   },
  initializeState: state => {
    CTRL.initialState = state;
    CTRL.state = Utils.deepCopy(CTRL.initialState);
  }
};

export default CTRL;
