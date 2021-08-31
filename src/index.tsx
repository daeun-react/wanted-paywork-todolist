import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Theme } from 'styles/Theme';
import GlobalStyles from 'styles/GlobalStyles';
import App from 'App';

ReactDOM.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={{ ...Theme }}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
