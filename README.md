# React-State-CTRL


## Installation

```
npm install react-state-ctrl --save
```

## Example

#### `index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CTRL, { StateControl } from 'react-state-ctrl';

CTRL.initializeState({
  name: "iNont"
});

let StateCTRL = StateControl(App);
ReactDOM.render(
  <StateCTRL />
, document.getElementById('root'));
```

#### `App.js`
```
import React, { Component } from 'react';

import CTRL from 'react-state-ctrl';

class App extends Component {
  render() {
    return (
      <div>
      	My name is {CTRL.state.name}.
        <input value={CTRL.state.name} placeholder="Type to change name"
         onChange={(event)=>CTRL.setState({ name: event.target.value })} />
      </div>
    );
  }
}

export default App;

```

#### Commands
- `CTRL.initializeState(initialState)`
- `CTRL.setState(state)`
- `CTRL.resetState()`
- `CTRL.forceUpdate()`