import React from 'react';
import { Redirect } from 'react-router';

const CTRL = {
  app: { forceUpdate: ()=>{} },
  initialState: {},
  state: {},
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

export const StateControl = Comp => (props => <Comp {...props} ref={app=>CTRL.app = app} />);
export const RouteControl = Comp => (props => {
  if(CTRL.redirectTo) {
    let redirectTo = CTRL.redirectTo;
    CTRL.redirectTo = undefined;
    return <Redirect to={redirectTo} />
  }
  return <Comp {...props} ref={() => CTRL.location = props.location} />;
});
export default CTRL;
