# React-NC


## Installation

```
npm install react-nc --save
```

## Example

#### `index.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CTRL, { StateControl } from 'react-nc';

CTRL.initializeState({
  name: "iNont"
});

let StateCTRL = StateControl(App);
ReactDOM.render(
  <StateCTRL />
, document.getElementById('root'));
```

#### `App.js`
```js
import React, { Component } from 'react';

import CTRL from 'react-nc';

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
