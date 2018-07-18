# React-NC

Your react state can be anything and anywhere,, Create your universe with React-NC.

### Updated

- **Version 1.2.0**: `RouteControl` is now deprecated,, `NCRouter` is now provided for route management.

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

# React-NC with NCRouter

`NCRouter` helps you manage your routes, it's easy to route to the path you want to.  
*Note: You can still use `CTRL.redirect("/path")` with `react-router-dom` same as the previous version*


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

import CTRL, { StateControl, NCRouter, Route } from 'react-nc';

import MainPage from './MainPage';
import EditPage from './EditPage';
import DetailPage from './DetailPage';

CTRL.routing.setPrefix("/my-web");

class App extends Component {
  render() {
    return (
      <NCRouter>
        <Route default path="/" component={MainPage} />
        <Route path="/edit" component={EditPage} />
        <Route path="/detail/{username}" component={DetailPage} />
      </NCRouter>
    );
  }
}

export default StateControl(App);
```

#### `MainPage.js`
```js
import React, { Component } from 'react';

import CTRL from 'react-nc';

class MainPage extends Component {
  render() {
    return (
      <div>
        My name is {CTRL.state.name}.
        <button onClick={()=>CTRL.routing.redirect("/edit")}>Edit</button>
        <button onClick={()=>CTRL.routing.redirect("/detail/"+CTRL.state.name)}>Detail</button>
      </div>
    );
  }
}

export default MainPage;
```

#### `EditPage.js`
```js
import React, { Component } from 'react';

import CTRL from 'react-nc';

class EditPage extends Component {
  render() {
    return (
      <div>
        <input value={CTRL.state.name} placeholder="Type to change name"
          onChange={(event)=>CTRL.setState({ name: event.target.value })} />
        <button onClick={()=>CTRL.routing.redirect("/")}>Back</button>
        <button onClick={()=>CTRL.resetState()}>Reset</button>
      </div>
    );
  }
}

export default EditPage;
```

#### `DetailPage.js`
```js
import React, { Component } from 'react';

import CTRL from 'react-nc';

class DetailPage extends Component {
  render() {
    return (
      <div>
      	My username: {this.props.match.params.username}.
        <button onClick={()=>CTRL.routing.redirect("/somewhere-does-not-exist")}>To default page</button>
      </div>
    );
  }
}

export default DetailPage;
```

---

### Commands

#### `CTRL.routing.setPrefix(prefix)`

Set prefix of your routes. Then, all of your paths will be started with that prefix.

```js
CTRL.routing.setPrefix("/my-web");

// If your path is "/edit", it will be "/my-web/edit" in browser url
```

#### `CTRL.routing.redirect(path)`

Redirect to path, `path` can be string or object.

```js
CTRL.routing.setPrefix("/my-web");
CTRL.routing.redirect("/edit");

// location will be "/my-web/edit"
```

or `path` as object

```js
CTRL.routing.setPrefix("/my-web");
CTRL.routing.redirect({
  pathname: "edit",
  search: "?id=inont",
  hash: "#top"
});

// location will be "/my-web/edit?id=inont#top"
```

#### `CTRL.routing.replacePath(path)`

Replace the current path to `path`.

#### `CTRL.routing.query(query)`

`query` as object, this will change query string on url to `query`.

```js
CTRL.routing.setPrefix("/my-web");
CTRL.routing.redirect("/edit");
CTRL.routing.query({
  id: "inont"
});

// location will be "/my-web/edit?id=inont"
```
