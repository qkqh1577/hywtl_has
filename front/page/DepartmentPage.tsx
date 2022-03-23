import React, { useEffect } from 'react';
import useDepartment from 'department/hook';
import { Grid } from '@mui/material';

const DepartmentPage = () => {

  const {
    departmentState: {
      detail
    },
    getOne,
    clearOne
  } = useDepartment();

  useEffect(() => {
    getOne(1);

    return () => {
      clearOne();
    };
  }, []);

  return (
    <Grid item container spacing={3}>
      {detail && (
        <>
          <Grid item sm={6}>
            {detail.name}
          </Grid>
          <Grid item sm={6}>
            {detail.category}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default DepartmentPage;