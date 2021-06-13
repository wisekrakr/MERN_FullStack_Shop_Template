import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./css/style.css";

import Home from "./components/Home";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />

          {/* <Route component={Routes} /> */}
        </Switch>
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
