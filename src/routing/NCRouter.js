import React, { Component } from 'react'
import CTRL from '../CTRL';

const Route = (props) => {}

class NCRouter extends Component {
  render() {
    if(this.props.children === undefined) throw new Error("NCRouter requires at least one Route.");
    let array = Array.isArray(this.props.children) ? this.props.children.filter(e => e) : [this.props.children];
    let match = {};
    let location = {
      pathname: window.location.pathname.startsWith(CTRL.routing.prefix || "") ?
        window.location.pathname.replace(CTRL.routing.prefix, "") : window.location.pathname,
      hash: window.location.hash,
      search: window.location.search
    }
    let Default = null;
    let Match = null;
    array.forEach(e=>{
      if(e.type !== Route) throw new Error("NCRouter only allows Route as child elements.");
      if(e.props.default) {
        if(Default !== null) throw new Error("NCRouter must have only one default Route.");
        if(/\{[\w\d_]+\}/.test(e.props.path)) throw new Error("Default Route must not have params in path.");
        Default = e;
      }
      if(e.props.path === undefined || e.props.component === undefined) {
        throw new Error("Route must have 'path' and 'component' as its properties.");
      }
      if(Match) return ;
      let routePath = e.props.path;
      let pathname = window.location.pathname.replace(/\/+/g,"/").replace(/\/$/, "");
      let routePathReplaced = routePath;
      let routePathReplacedTemp = routePathReplaced;
      let reg = /\{([\w\d_]+)\}/;
      let params = [];
      do {
        routePathReplaced = routePathReplacedTemp;
        routePathReplacedTemp = routePathReplaced.replace(reg, ()=>{
          params.push(RegExp.$1);
          return "[^/]*";
        })
      } while(routePathReplaced !== routePathReplacedTemp);
      let routeRegExp = new RegExp(`^${CTRL.routing.prefix}${routePathReplaced}$`);
      if( routeRegExp.test(pathname) ) {
        Match = e;
        let findParamValues = pathname.split("/");
        let routePathSplited = (CTRL.routing.prefix+routePath).split("/");
        let paramsToPass = {};
        routePathSplited.forEach((e,i)=>{
          if(params.includes(e.slice(1, -1))) {
            paramsToPass[e.slice(1, -1)] = findParamValues[i];
          }
        });
        match = {
          path: routePath,
          params: paramsToPass
        }
      }
    });
    if(Match === null) {
      Match = Default || array[0];
      match = {path: Match.props.path};
      window.history.replaceState(null, "", `${CTRL.routing.prefix}${Default.props.path}`);
      location = {
        pathname: window.location.pathname.startsWith(CTRL.routing.prefix || "") ?
          window.location.pathname.replace(CTRL.routing.prefix, "") : window.location.pathname,
        hash: window.location.hash,
        search: window.location.search
      }
    }
    CTRL.routing.location = location;
    CTRL.routing.match = match;
    return <Match.props.component location={location} match={match} />
  }
}

export { Route };
export default NCRouter;
