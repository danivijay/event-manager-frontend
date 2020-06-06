import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Events from "./components/pages/Events";
import Form from "./components/pages/Form";
import { Provider } from "react-redux";
import store from "./store";
import Preview from "./components/pages/Preview";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <h1>Event Manager</h1>
        <Switch>
          <Route path="/event/:id/preview">
            <Preview />
          </Route>
          <Route path="/event/:id">
            <Form />
          </Route>
          <Route path="/">
            <Events />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
