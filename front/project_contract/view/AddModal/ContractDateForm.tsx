import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import TextField from 'components/TextField';
import Text from 'layouts/Text';

export default function ContractDateForm(props) {
  return (
    <Box sx={{
      display:        'flex',
      justifyContent: 'center',
      width:          '100%',
      padding:        '15px 20px',
      border:         `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:   '5px',
      marginBottom:   '20px',
    }}>
      <Grid container item sm={3} justifyContent="space-evenly" alignItems="center">
        <Grid item sm={3}>
          <TextField
            disableLabel
            name="year"
            label="년"
            variant="outlined"
          />
        </Grid>
        <Grid
          container
          item
          sm={1}
          justifyContent="center"
        >
          <Text variant="body2">
            년
          </Text>
        </Grid>
        <Grid item sm={3}>
          <TextField
            disableLabel
            name="month"
            label="월"
            variant="outlined"
          />
        </Grid>
        <Grid
          container
          item
          sm={1}
          justifyContent="center"
        >
          <Text variant="body2">
            월
          </Text>
        </Grid>
        <Grid item sm={3}>
          <TextField
            disableLabel
            name="day"
            label="일"
            variant="outlined"
          />
        </Grid>
        <Grid
          container
          item
          sm={1}
          justifyContent="center"
        >
          <Text variant="body2">
            일
          </Text>
        </Grid>
      </Grid>
    </Box>
  );
}
