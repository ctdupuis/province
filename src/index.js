import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import { API_WS_ROOT } from './constants';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
)


ReactDOM.render(
  <Provider store={store}>
      <ActionCableProvider url={API_WS_ROOT}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ActionCableProvider>
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
