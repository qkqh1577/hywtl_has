import {
  Box,
  Grid
} from '@mui/material';
import React from 'react';
import TextField from 'components/TextField';


export default function ProjectStatusFailReasonAddModalForm() {
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'wrap',
      justifyContent: 'space-around',
      marginBottom:   '10px',
      alignItems:     'flex-start'
    }}>
      <Box sx={{
        display: 'flex',
        width:   '100%',
      }}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              required
              labelPosition="top"
              name="win"
              label="수주업체"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              required
              labelPosition="top"
              name="testAmount"
              label="풍동금액"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              required
              labelPosition="top"
              name="reviewAmount"
              label="구검"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              required
              labelPosition="top"
              name="totalAmount"
              label="총액"
            />
          </Grid>
          <Grid item sm={3}>
            <TextField
              required
              labelPosition="top"
              name="expectedDuration"
              label="일정"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              multiline
              required
              labelPosition="top"
              name="reason"
              label="원인"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
