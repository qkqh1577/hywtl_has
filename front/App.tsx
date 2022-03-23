import React from 'react';
import { Provider } from 'react-redux';
import store from 'common/store';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DepartmentPage from 'page/DepartmentPage';
import DetailPage from 'page/DetailPage';

const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#eee',
    color: '#fff',
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={3} className={classes.root}>
          <Grid item container sm={6}>
            <DepartmentPage />
          </Grid>
          <Grid item container sm={6}>
            <DetailPage />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
