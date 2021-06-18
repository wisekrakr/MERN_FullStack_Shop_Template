import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../components/Home";
import ProductInfo from "../components/products/ProductInfo";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route exact path="/product/:id" component={ProductInfo} />
      </Switch>
    </div>
  );
};

export default Routes;
