import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './App/App';
import { AppState } from './AppState/AppState';
import { Provider } from './Context';
import { initIndexConfig } from './indexConfig';

initIndexConfig();

const root = document.getElementById('root');

if (root !== null) {
    const appState = new AppState();

    const domJsx = (
        <Provider value={appState}>
            <App />
        </Provider>
    );

    ReactDOM.render(domJsx, root);
}
