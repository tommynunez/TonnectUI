import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

const outerTheme = createMuiTheme({
  /*palette: {
    primary: {
      light: '#4791db',
      main: '#1976d2',
      dark: '#115293',
      contrastText: '#fff',
    },
    secondary: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#fff'
    },
    contrastThreshold: 3,
    tonalOffset: 0.1,
  },*/
});

ReactDOM.render(
    <MuiThemeProvider  theme={outerTheme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
