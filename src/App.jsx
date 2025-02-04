import React from "react";

import { PageNotFound } from "components/commons";
import ProductList from "components/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Product from "./components/Product";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path="/products" />
    <Route exact component={Product} path="/products/:slug" />
    <Redirect exact from="/" to="/products" />
    <Route component={PageNotFound} path="*" />
  </Switch>
);
export default App;
