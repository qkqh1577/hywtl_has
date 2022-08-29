import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from 'app/route/app';
import store from 'services/store';
import 'dayjs/locale/ko';
import { ThemeProvider } from '@mui/styles';
import mainTheme from 'app/view/App/theme';
import {
  Alert,
  Confirm
} from 'components/Dialog';
import {
  Box,
  CssBaseline
} from '@mui/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartGantt,
  faFilePowerpoint,
  faAddressCard,
  faBuilding,
  faListOl,
  faGear,
  faCircle,
  faMinus,
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faChartGantt,
  faFilePowerpoint,
  faAddressCard,
  faBuilding,
  faListOl,
  faGear,
  faCircle,
  faMinus,
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
);

const render = () => {

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="*" element={
            <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="ko">
                <ThemeProvider theme={mainTheme}>
                  <CssBaseline />
                  <Box sx={{
                    display:    'flex',
                    width:      '100%',
                    height:     '100vh',
                    fontFamily: 'Noto Sans KR'
                  }}>
                    <App />
                  </Box>
                  <Alert />
                  <Confirm />
                </ThemeProvider>
              </LocalizationProvider>
            </Provider>
          }
          />
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
