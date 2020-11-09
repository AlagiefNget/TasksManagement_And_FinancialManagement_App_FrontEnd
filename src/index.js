import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import indexRoutes from './app/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {createBrowserHistory} from "history";
import { Provider } from 'react-redux';
import store from './store';

const _history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter history={_history}>  
      <Switch>
        {
          indexRoutes.map((route, key) =>{
            return <Route path={route.path} component={route.component} key={key} />
          })
        }
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
