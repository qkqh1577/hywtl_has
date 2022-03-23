import React from 'react';
import { Provider } from 'react-redux';
import store from 'common/store';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DepartmentPage from 'page/DepartmentPage';

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#faa'
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid container spacing={3} className={classes.root}>
          <DepartmentPage />
        </Grid>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
