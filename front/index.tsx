import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from 'app/route/app';
import store from 'services/store';
import 'dayjs/locale/ko';
import { ThemeProvider } from '@mui/material/styles';
import mainTheme from 'assets/theme';
import {
  Box,
  CssBaseline
} from '@mui/material';
import {
  IconDefinition,
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faAddressCard,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faAngleUp,
  faArrowRightFromBracket,
  faBuilding,
  faChartGantt,
  faCheck,
  faCircle,
  faDownload,
  faFilePowerpoint,
  faFloppyDisk,
  faGear,
  faLink,
  faListOl,
  faMinus,
  faPen,
  faPlus,
  faStar,
  faTimes,
  faTrash,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faReadme, } from '@fortawesome/free-brands-svg-icons';
import { BusinessSelectorModalRoute } from 'components/BusinessSelector';
import AlertRoute from 'dialog/route/alert';
import ConfirmRoute from 'dialog/route/confirm';
import {Progress} from "./components/Progress";

library.add(
  faAddressCard,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faAnglesLeft,
  faAnglesRight,
  faArrowRightFromBracket,
  faBuilding,
  faChartGantt,
  faCheck,
  faCircle,
  faDownload,
  faFilePowerpoint,
  faFloppyDisk,
  faGear,
  faLink,
  faListOl,
  faMinus,
  faPen,
  faPlus,
  faReadme as IconDefinition,
  faStar,
  faTimes,
  faTrash,
  faUser,
  faXmark,
);

const render = () => {

  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <Provider store={store}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
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
                    <AlertRoute />
                    <ConfirmRoute />
                    <BusinessSelectorModalRoute />
                    <Progress/>
                  </ThemeProvider>
                </LocalizationProvider>
              </Provider>
            }
          />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

render();

if (module.hot) {
  module.hot.accept('/', render);
}
