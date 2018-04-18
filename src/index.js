import CTRL from './CTRL';
import * as Utils from './Utils';
import StateControl from './StateControl';
import { NCRoute, Route } from './routing';

const RouteControl = (Comp) => {
  console.warn("RouteControl is now deprecated, it will be removed.");
  return Comp;
}

export {
  Utils,
  StateControl, RouteControl,
  NCRoute, Route
};
export default CTRL;
