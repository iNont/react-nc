import React from 'react';
import CTRL from './CTRL';
import RouteControl from './RouteControl';

const StateControl = Comp => (props => <Comp {...props} ref={app=>CTRL.app = app} />);
export {
  StateControl,
  RouteControl
};
export default CTRL;
