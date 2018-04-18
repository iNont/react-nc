import React from 'react';
import CTRL from './CTRL';
import * as Utils from './Utils';

class StateControlComponent extends React.Component {
  constructor(props) {
    super(props);
    CTRL.app = this;
    this.state = Utils.deepCopy(CTRL.initialState);
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
