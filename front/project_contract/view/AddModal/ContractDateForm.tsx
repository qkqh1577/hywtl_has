import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import TextField from 'components/TextField';
import Text from 'layouts/Text';

export default function ContractDateForm(props) {
  const dateSplit = props.formik.values.basic.contractDateSplit;

  const setContractDate = (year,
                           month,
                           day
  ) => {
    const date = new Date(year, month - 1, day);
    props.formik.setFieldValue('basic.contractDate', date.getFullYear() ? date : undefined);
  };

  const changeYear = (e) => setContractDate(e.target.value, dateSplit.month, dateSplit.day);
  const changeMonth = (e) => setContractDate(dateSplit.year, e.target.value, dateSplit.day);
  const changeDay = (e) => setContractDate(dateSplit.year, dateSplit.month, e.target.value);

  return (
    <Box sx={{
      display:        'flex',
      justifyContent: 'center',
      width:          '100%',
      padding:        '15px 20px',
      border:         `1px solid ${ColorPalette._e4e9f2}`
      ,
      borderRadius: '5px',
      marginBottom: '20px',
    }}>
      <Grid container item sm={3} justifyContent="space-evenly" alignItems="center">
        <Grid item sm={3}>
          <TextField
            disableLabel
            name="basic.contractDateSplit.year"
            label="년"
            variant="outlined"
            onChange={changeYear}
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
            name="basic.contractDateSplit.month"
            label="월"
            variant="outlined"
            onChange={changeMonth}
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
            name="basic.contractDateSplit.day"
            label="일"
            variant="outlined"
            onChange={changeDay}
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
