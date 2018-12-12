import './polyfills';
import CTRL from './CTRL';
import * as Utils from './Utils';
import StateControl from './StateControl';
import { NCRouter, Route } from './routing';

const RouteControl = (Comp) => {
  console.warn("RouteControl is now deprecated, it will be removed.");
  return Comp;
}

export {
  Utils,
  StateControl, RouteControl,
  NCRouter, Route
};
export default CTRL;
