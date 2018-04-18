import * as Utils from './Utils';

const CTRL = {
  app: undefined,
  debug: false,
  initialState: {},
  routing: {},
  log: (text) => { if(CTRL.debug) console.log(`React-nc: ${text}`); },
  forceUpdate: () => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.app.forceUpdate();
  },
  setState: state => {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    CTRL.app.setState(state);
  },
  resetState: () => {
    CTRL.setState(Utils.deepCopy(CTRL.initialState));
   },
  initializeState: state => {
    CTRL.initialState = state;
    if(CTRL.app) {
      CTRL.resetState();
    }
  },
  get state() {
    if(!CTRL.app) {
      throw new Error("Application wrapped by StateControl is not found");
    }
    return CTRL.app.state;
  }
};

export default CTRL;
