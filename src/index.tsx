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

    // appState.grid.getFrom(2, 1).getFrom(0, 1).number.value = 4;
    // appState.grid.getFrom(1, 0).getFrom(1, 1).number.value = 5;
    // appState.grid.getFrom(0, 1).getFrom(0, 1).number.value = 3;

    const domJsx = (
        <Provider value={appState}>
            <ThemeProvider theme={{ config }}>
                <App />
            </ThemeProvider>
        </Provider>
    );

    ReactDOM.render(domJsx, root);
}
