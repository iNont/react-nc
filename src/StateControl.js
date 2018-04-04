import React from 'react';
import CTRL from './CTRL';

class StateControlComponent extends React.Component {
  constructor(props) {
    super(props);
    CTRL.app = this;
  }
  componentWillMount() {
    CTRL.appUpdating = true;
    CTRL.log("StateControl willMount");
  }
  componentDidMount() {
    CTRL.appUpdating = false;
    CTRL.log("StateControl didMount");
    if(CTRL.redirectTo) {
      CTRL.log("StateControl needRedirect");
      CTRL.forceUpdate();
    }
  }
  componentWillUpdate() {
    CTRL.appUpdating = true;
    CTRL.log("StateControl willUpdate");
  }
  componentDidUpdate() {
    CTRL.appUpdating = false;
    CTRL.log("StateControl didUpdate");
    if(CTRL.redirectTo) {
      CTRL.log("StateControl needRedirect");
      CTRL.forceUpdate();
    }
  }
  render() {
    const Comp = this.props.component;
    const props = this.props.props;
    return <Comp {...props} />;
  }
}

const StateControl = (Comp) => (props) =>
  <StateControlComponent component={Comp} props={props} />;

export default StateControl;
