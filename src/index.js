import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import indexRoutes from './app/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {
        indexRoutes.map((route, key) =>{
          return <Route path={route.path} component={route.component} key={key} />
        })
      }
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// serviceWorker.register();