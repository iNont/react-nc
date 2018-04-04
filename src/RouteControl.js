import React from 'react';
import { Redirect } from 'react-router';
import CTRL from './CTRL';

class RouteControlComponent extends React.Component {
  constructor(props) {
    super(props);
    this.previousLocation = JSON.stringify(CTRL.location);
    CTRL.location = props.props.location;
  }
  componentWillMount() {
    CTRL.log("RouteControl willMount");
    CTRL.routeUpdating = true;
  }
  componentDidMount() {
    CTRL.log("RouteControl didMount");
    CTRL.routeUpdating = false;
    if(this.previousLocation !== JSON.stringify(CTRL.location)) {
      CTRL.log("RouteControl location changed");
      CTRL.forceUpdate();
    }
  }
  componentWillUpdate() {
    CTRL.log("RouteControl willUpdate");
    CTRL.routeUpdating = true;
  }
  componentDidUpdate() {
    CTRL.log("RouteControl didUpdate");
    CTRL.routeUpdating = false;
    this.previousLocation = JSON.stringify(CTRL.location);
    CTRL.location = this.props.props.location;
    if(this.previousLocation !== JSON.stringify(CTRL.location)) {
      CTRL.log("RouteControl location changed");
      CTRL.forceUpdate();
    }
  }
  render() {
    if(CTRL.redirectTo) {
      let redirectTo = CTRL.redirectTo;
      CTRL.redirectTo = undefined;
      return <Redirect to={redirectTo} />
    }
    const Comp = this.props.component;
    const props = this.props.props;
    return <Comp {...props} />;
  }
}

const RouteControl = (Comp) => (props) =>
  <RouteControlComponent component={Comp} props={props} />;

export default RouteControl;
