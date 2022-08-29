import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import Header from 'project/document/view/Header';
import List from 'project/document/view/List';

export default function ProjectDocument() {
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Header />
          <List />
        </Grid>
        <Grid item sm={12}>
          <Header />
          <List />
        </Grid>
        <Grid item sm={12}>
          <Header />
          <List />
        </Grid>
      </Grid>
    </Box>
  );
};
