const CTRL = {
  app: { forceUpdate: ()=>{} },
  debug: false,
  initialState: {},
  state: {},
  location: {
    hash: window.location.hash,
    pathname: window.location.pathname,
    search: window.location.search,
  },
  log: (text) => { if(CTRL.debug) console.log(`React-nc: ${text}`); },
  forceUpdate: () => {
    CTRL.log("forceUpdate()");
    CTRL.app.forceUpdate();
  },
  setState: state => {
    CTRL.log(`setState()`);
    CTRL.state = { ...CTRL.state, ...state }
    CTRL.forceUpdate();
  },
  resetState: () => {
    CTRL.log(`resetState()`);
    CTRL.setState(CTRL.initialState)
   },
  initializeState: state => {
    CTRL.initialState = state;
    CTRL.setState(CTRL.initialState);
  },
  redirect: (path) => {
    let fullPath = undefined;
    if(typeof path === "string") {
      fullPath = path;
    }
    else if(typeof path === "object") {
      fullPath = path.pathname !== undefined ?
        path.pathname + (path.search || "") + (path.hash || "")
      : undefined;
    }
    CTRL.log(`redirect(${fullPath})`);
    CTRL.redirectTo = fullPath;
    CTRL.forceUpdate();
  }
};

export default CTRL;
