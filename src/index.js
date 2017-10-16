import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './main.css';
import combinedReducer from './reducers';
import reducersTests from './reducers/tests';
import App from './components/app';

reducersTests();

const store = createStore(combinedReducer);

ReactDOM.render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('root')
);
