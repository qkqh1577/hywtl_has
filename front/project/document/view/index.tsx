import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import Header from 'project/document/view/Header';
import List, { ListProps } from 'project/document/view/List';

interface Props
  extends ListProps {

}

export default function ProjectDocument({receivedList, sentList, buildingList}: Props) {
  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Header title="받은 자료" />
          <List receivedList={receivedList} />
        </Grid>
        <Grid item sm={12}>
          <Header title="보낸 자료" />
          <List sentList={sentList} />
        </Grid>
        <Grid item sm={12}>
          <Header title="형상비검토 자료" />
          <List buildingList={buildingList} />
        </Grid>
      </Grid>
    </Box>
  );
};
