const CTRL = {
  app: { forceUpdate: ()=>{} },
  initialState: {},
  state: {},
  location: {
    hash: window.location.hash,
    pathname: window.location.pathname,
    search: window.location.search,
  },
  setState: state => {
    CTRL.state = { ...CTRL.state, ...state }
    CTRL.app.forceUpdate();
  },
  resetState: () => { CTRL.setState(CTRL.initialState) },
  forceUpdate: () => { CTRL.app.forceUpdate() },
  initializeState: state => {
    CTRL.initialState = state;
    CTRL.setState(CTRL.initialState);
  },
  redirect: (path) => {
    CTRL.redirectTo = path;
    CTRL.forceUpdate();
  }
};

export default CTRL;
