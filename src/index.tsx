import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './App/App';
import { AppState } from './AppState/AppState';
import { Provider } from './Context';
import { initIndexConfig } from './indexConfig';
import { ThemeProvider } from '@emotion/react'
import { Config } from './cssConfig';

initIndexConfig();

const root = document.getElementById('root');

if (root !== null) {
    const config = new Config();
    const appState = new AppState();

    const domJsx = (
        <Provider value={appState}>
            <ThemeProvider theme={{ config }}>
                <App />
            </ThemeProvider>
        </Provider>
    );

    ReactDOM.render(domJsx, root);
}
