import {
  projectMemoCategoryName,
  ProjectMemoVO
} from 'project_memo/domain';
import {
  Box,
  Grid
} from '@mui/material';
import React from 'react';
import DateFormat from 'components/DateFormat';

export interface ProjectMemoListProps {
  list: ProjectMemoVO[];
}

export default function ProjectMemoList({ list }: ProjectMemoListProps) {

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      {list.map((item) => (
        <Box sx={{
          display: 'flex',
          width:   '100%',
          border:  '1px solid #000',
          margin:  '12px 0'
        }}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <DateFormat date={item.createdAt} format="YYYY-MM-DD HH:mm" />
            </Grid>
            <Grid item sm={6}>
              {item.writer.name}
            </Grid>
            <Grid item sm={6}>
              {projectMemoCategoryName(item.category)}
            </Grid>
            <Grid item sm={12}>
              {item.description}
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}