import React, { useEffect } from 'react';
import useDepartment from 'department/hook';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DepartmentQuery } from 'department/parameter';
import Department from 'department/Department';

const useStyles = makeStyles(() => ({
  box: {
    border: '1px solid #777',
    marginBottom: '4px',
    padding: '4px',
  },
  nameBox: {
    backgroundColor: '#006c8f',
  },
  selectedNameBox: {
    backgroundColor: '#0076c0',
  },
  nameLabel: {
    cursor: 'pointer',
  }
}));

const initialQuery: DepartmentQuery = {
  size: 100,
  page: 0,
  category: [],
};

const DepartmentComponent = (props: { department: Department }) => {
  const classes = useStyles();
  const { department } = props;
  const {
    departmentState: {
      selectedId
    },
    selectOne
  } = useDepartment();
  const isOpenable = department.childrenList.length > 0;
  const isSelected = selectedId === department.id;

  const clickHandler = () => {
    if (selectedId !== department.id) {
      selectOne(department.id);
    } else {
      selectOne(undefined);
    }
  };

  return (
    <Grid item container spacing={1} className={classes.box}>
      <Grid item sm={1}>
        {'┤'}
      </Grid>
      <Grid item sm={11} onClick={clickHandler} className={isSelected ? classes.selectedNameBox : classes.nameBox}>
        <h3 className={classes.nameLabel}>
          {`${department.name} (${department.childrenList.length})`}
        </h3>
      </Grid>
      {isOpenable && (
        <>
          <Grid item sm={1}>
            {'└'}
          </Grid>
          <Grid item container sm={11}>
            {department.childrenList.map(
              (child) => (<DepartmentComponent key={child.id} department={child} />)
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

const DepartmentPage = () => {

  const {
    departmentState: {
      page,
    },
    getPage,
  } = useDepartment();

  useEffect(() => {
    getPage(initialQuery);
  }, []);

  return (
    <Grid item container>
      {page.content.map((department) => (
        <DepartmentComponent key={department.id} department={department} />
      ))}
    </Grid>
  );
};

export default DepartmentPage;