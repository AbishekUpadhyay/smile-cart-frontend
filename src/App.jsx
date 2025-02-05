import React from "react";

import { PageNotFound } from "components/commons";
import ProductList from "components/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
import Product from "./components/Product";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);
export default App;
