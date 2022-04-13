import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import LoginForm from 'pages/user/LoginForm';
import AuthenticationForm from 'pages/user/AuthenticationForm';
import { store } from 'common';

const render = () => {

  const mdTheme = createTheme({
    palette: {
      mode: 'light'
    }
  });

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user/authenticate" element={<AuthenticationForm />} />
          <Route path="*" element={
            <Provider store={store}>
              <ThemeProvider theme={mdTheme}>
                <App />
              </ThemeProvider>
            </Provider>
          } />
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('/', render);
}
