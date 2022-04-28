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
import 'dayjs/locale/ko';

const render = () => {
  const mdTheme = createTheme({
    typography: {
      fontFamily: [
        'inter'
      ].join(',')
      ,
      fontSize: 12
    },
    palette: {
      primary: {
        main: '#301a9a',
      },
      secondary: {
        main: '#3c3757',
      },
      warning: {
        main: '#ffd130',
      },
      info: {
        main: '#7685b2'
      },
      action: {
        active: '#5470ff',
        hover: '#5470FF38',
        selected: '#5470ff',
        disabled: '#494949',
        disabledBackground: '#f1eaff',
      },
    },
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
