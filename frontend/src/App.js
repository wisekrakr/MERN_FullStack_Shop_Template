import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Routes from "./routing/routes";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route component={Routes} />
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
