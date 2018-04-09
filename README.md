# React-NC

Your react state can be anything and anywhere,, Create your universe with React-NC.

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

import CTRL from 'react-nc';

CTRL.initializeState({
  name: "iNont"
});

ReactDOM.render(
  <App />
, document.getElementById('root'));
```

#### `App.js`
```js
import React, { Component } from 'react';

import CTRL, { StateControl } from 'react-nc';

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

export default StateControl(App);
```

---

### Commands

#### `CTRL.initializeState(initialState)`

Set the initial state of CTRL.

```js
CTRL.initializeState({
  name: "iNont",
  title: "React-NC",
  array: [0, 1, 2, 3]
});

console.log(`My name is ${CTRL.state.name}.`);

// Output: My name is iNont.
```

#### `CTRL.setState(state)`

Set state of CTRL, you can use it likes `setState()` of react component.

```js
CTRL.initializeState({
  name: "iNont",
  title: "React-NC",
  array: [0, 1, 2, 3]
});
CTRL.setState({
  name: "Changed name"
});

console.log(CTRL.state);

/* Output: {
  name: "Changed name",
  title: "React-NC",
  array: [0, 1, 2, 3]
} */
```

#### `CTRL.resetState()`

Reset CTRL state to initial state.

#### `CTRL.forceUpdate()`

Force update the component wrapped by ``StateControl``.


---

# React-NC with Redirect (react-router-dom)

React-NC provides `CTRL.redirect(path)` to control the ``react-router-dom`` route.  

### Usage

```js
CTRL.redirect("/login");
```

### Setting Up

You have to wrap the component pass to ``Route`` component of ``react-router-dom`` with ``RouteControl``.

### Example

#### `index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CTRL from 'react-nc';

CTRL.initializeState({
  name: "iNont"
});

ReactDOM.render(
  <App />
, document.getElementById('root'));
```

#### `App.js`
```js
import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainPage from './MainPage';
import EditPage from './EditPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/edit" component={EditPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default StateControl(App);
```

#### `MainPage.js`
```js
import React, { Component } from 'react';

import CTRL, { RouteControl } from 'react-nc';

class MainPage extends Component {
  render() {
    return (
      <div>
        My name is {CTRL.state.name}.
        <button onClick={()=>CTRL.redirect("/edit")}>Edit</button>
      </div>
    );
  }
}

export default RouteControl(MainPage);
```

#### `EditPage.js`
```js
import React, { Component } from 'react';

import CTRL, { RouteControl } from 'react-nc';

class EditPage extends Component {
  render() {
    return (
      <div>
        <input value={CTRL.state.name} placeholder="Type to change name"
          onChange={(event)=>CTRL.setState({ name: event.target.value })} />
        <button onClick={()=>CTRL.redirect("/")}>Back</button>
        <button onClick={()=>CTRL.resetState()}>Reset</button>
      </div>
    );
  }
}

export default RouteControl(EditPage);
```
