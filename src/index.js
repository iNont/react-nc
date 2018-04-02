import React from 'react';

const CTRL = {
  app: { forceUpdate: ()=>{} },
  initialState: {},
  state: {},
  setState: state => {
    CTRL.state = { ...CTRL.state, ...state }
    CTRL.app.forceUpdate();
  },
  resetState: ()=>{CTRL.setState(CTRL.initialState)},
  forceUpdate: ()=>{CTRL.app.forceUpdate()},
  initialState: state => {
    CTRL.initialState = state;
    CTRL.setState(CTRL.initialState);
  }
};

export const StateControl = Comp => (props => <Comp {...props} ref={app=>CTRL.app = app} />);
export default CTRL;
