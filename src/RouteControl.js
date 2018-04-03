import React from 'react';
import { Redirect } from 'react-router';
import CTRL from './CTRL';

class RouteControlComponent extends React.Component {
  constructor(props) {
    super(props);
    this.previousLocation = JSON.stringify(CTRL.location);
    CTRL.location = props.props.location;
  }
  componentDidMount() {
    if(this.previousLocation !== JSON.stringify(CTRL.location)) {
      CTRL.forceUpdate();
    }
  }
  componentDidUpdate() {
    this.previousLocation = JSON.stringify(CTRL.location);
    CTRL.location = this.props.props.location;
    if(this.previousLocation !== JSON.stringify(CTRL.location)) {
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
