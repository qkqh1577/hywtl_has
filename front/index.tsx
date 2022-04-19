import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from './App';
import { store } from 'services/common';
import LoginForm from 'pages/user/LoginForm';
import AuthenticationForm from 'pages/user/AuthenticationForm';
import 'dayjs/locale/ko'

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
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="ko">
                <ThemeProvider theme={mdTheme}>
                  <App />
                </ThemeProvider>
              </LocalizationProvider>
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
