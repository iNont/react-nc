import CTRL from '../CTRL';
import NCRouter, { Route } from './NCRouter';
import * as Utils from '../Utils';

CTRL.routing = {
  prefix: "",
  location: {
    pathname: window.location.pathname.startsWith(CTRL.routing.prefix) ?
      window.location.pathname.replace(CTRL.routing.prefix, "") : window.location.pathname,
    hash: window.location.hash,
    search: window.location.search
  },
  setPrefix: (prefix) => { CTRL.routing.prefix = prefix; },
  redirect: function(path) {
    path = typeof path === "object" ? `${path.pathname || ""}${path.search || ""}${path.hash || ""}` : path;
    window.history.pushState(null, "", `${CTRL.routing.prefix}${path}`);
    CTRL.forceUpdate();
  },
  replacePath: function(path) {
    window.history.replaceState(null, "", `${CTRL.routing.prefix}${path}`);
    CTRL.forceUpdate();
  },
  query: function(query) {
    let location = {
      ...CTRL.routing.location,
      search: typeof query === "object" ? Utils.jsonToQueryString(query) : query
    }
    CTRL.routing.redirect(location);
  }
}
CTRL.redirect = CTRL.routing.redirect;

export {
  NCRouter, Route
}
