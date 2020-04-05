import React from 'react';
import {Provider, connect} from "react-redux";
import * as uuid from "uuid";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Store from "./store";
import Home from "./views/Home";
import MovieDetail from "./views/MovieDetail";
import FullPageLoader from "./components/FullPageLoader";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Switch>
          <Route exact path="/movie/:movieId" component={MovieDetail}/>
          <Route path="/" component={Home}/>
        </Switch>
        <FullPageLoader/>
      </Router>
    </Provider>
  );
}

export default App;