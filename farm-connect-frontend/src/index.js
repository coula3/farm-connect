import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import rootReducer from './reducers'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import history from './utils/history';
import './index.css';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [
    "currentUser",
    "listings",
    "commodities",
    "farmers",
    "prospects",
    "interests",
    "errorMessages",
    "searchUsers",
    "connects"
  ]
}

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
const persistor = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <App />
        </Router>
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

