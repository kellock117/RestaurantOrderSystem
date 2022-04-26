import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import "./App.css"

import Register from "./components/register"

function App() {
  return (
    <div className="App">
      {/* <div className="login">
        <h1>Restaurants Order System</h1>
        <label>ID:</label>
        <input type="text"/>
        <label>Password:</label>
        <input type="text"/>
        <button>login</button>
      </div>
      <div className="register">
        <Link to={'/register'}>
          Register
        </Link>
      </div> */}

      <div className="container">
        <Switch>
          <Route exact path='/' />
          <Route
            path='/register'
            render={(props) => {
              <Register {...props} />
            }}
        </Switch>
      </div>
    </div>
  );
}

export default App;
