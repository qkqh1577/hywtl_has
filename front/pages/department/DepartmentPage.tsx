import React, {useEffect} from 'react';
import useDepartment from 'services/department/hook';
import {Button, Grid, Paper} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {DepartmentQuery} from 'services/department/parameter';
import Department from 'services/department/Department';
import DepartmentDetailPage from "./DepartmentDetailPage";
import DepartmentAddModalPage from "./DepartmentAddModalPage";

const useStyles = makeStyles(() => ({
  box: {
    //border: '1px solid #777',
    marginBottom: '0px',
    padding: '10px',

  },
  nameBox: {
    //backgroundColor: '#006c8f',
  },
  selectedNameBox: {
    backgroundColor: '#f0f0f0',
  },
  nameLabel: {
    cursor: 'pointer',
    padding: '0px',
    margin: '0px',
    fontSize: '14px'
  }
}));

const initialQuery: DepartmentQuery = {
  size: 100,
  page: 0,
  category: [],
};

const DepartmentComponent = (props: { department: Department }) => {
  const classes = useStyles();
  const {department} = props;
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
        {'┣'}
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
              (child) => (<DepartmentComponent key={child.id} department={child}/>)
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
    <Paper sx={{width: '100%', overflow: 'hidden', 'margin-bottom': '30px', padding: '20px'}}>

      <Grid item container>
        <Grid item sm={12}>

          <DepartmentAddModalPage></DepartmentAddModalPage>

          &nbsp;
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
            }}
          >
            선택부서 위치 이동
          </Button>
        </Grid>
        <Grid item sm={5}>
          {page.content.map((department) => (
            <DepartmentComponent key={department.id} department={department}/>
          ))}
        </Grid>
        <Grid item sm={7}>
          <DepartmentDetailPage></DepartmentDetailPage>
        </Grid>
      </Grid>

    </Paper>
  );
};

export default DepartmentPage;