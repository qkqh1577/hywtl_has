import React from 'react';
import {
  Grid,
  TablePagination,
  TablePaginationProps
} from '@mui/material';
import Page, {
  initialPage,
  pageSizeList
} from 'type/Page';
import { ProjectLogVO } from 'project_log/domain';

export interface FooterProps {
  page: Page<ProjectLogVO> | undefined;
  onPageChange: TablePaginationProps['onPageChange'];
  onRowsPerPageChange: TablePaginationProps['onRowsPerPageChange'];
}

export default function ({
                           page = initialPage,
                           onPageChange,
                           onRowsPerPageChange
                         }: FooterProps) {
  return (
    <Grid container spacing={2}>
      <Grid item
        sm={8}
        sx={{
          display:        'flex',
          justifyContent: 'flex-start',
        }}>
        <TablePagination
          component="div"
          rowsPerPageOptions={pageSizeList}
          count={page.totalElements}
          rowsPerPage={page.size}
          page={page.number}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Grid>
    </Grid>
  );
}
