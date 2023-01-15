import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  DepartmentQuery,
  initialDepartmentQuery
} from 'department/query';
import { departmentAction } from 'department/action';
import { useFormik } from 'formik';
import DepartmentTree from "../view/DepartmentTree";
import PageLayout from "../../layouts/PageLayout";
import ListViewButton from 'department_tree/view/ListViewButton';
import {ColorPalette} from "../../assets/theme";
import Box from '@mui/material/Box';

function Element() {
  const dispatch = useDispatch();
  const { page } = useSelector((root: RootState) => root.department);
  const setFilter = useCallback((formikProps: DepartmentQuery) => dispatch(departmentAction.setFilter(formikProps)), [dispatch]);

  const formik = useFormik<DepartmentQuery>({
    initialValues: initialDepartmentQuery,
    onSubmit:      (values) => {
      setFilter(values);
    }
  });

  useEffect(() => {
    setFilter(initialDepartmentQuery);
  }, []);

  useEffect(() => {
    formik.setSubmitting(false);
  }, [page]);

  return (

    <PageLayout
      title="조직 트리"
      titleRightComponent={<ListViewButton />}
      filter={
        <Box sx={{
          display:        'flex',
          flexWrap:       'wrap',
          width:          '100%',
          justifyContent: 'space-between',
          alignItems:     'flex-start',
          marginLeft:     '20px',
          marginRight:    '30px',
          padding:        '20px',
          border:         `1px solid ${ColorPalette._e4e9f2}`,
          borderRadius:   '5px',
        }}>
          <DepartmentTree/>
        </Box>
      }
      body={<></>}
    />
  );
}

const departmentTreeRoute: AppRoute = {
  path:    '/admin/department-management-tree',
  element: <Element />
};

export default departmentTreeRoute;