import { AppRoute } from 'services/routes';
import React, {
  useCallback,
  useEffect
} from 'react';
import DepartmentDetail from 'department/view/Detail';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import useId from 'services/useId';
import { useFormik } from 'formik';
import {
  DepartmentVO,
  initialDepartment
} from 'department/domain';
import { DepartmentParameter } from 'department/parameter';
import { departmentAction } from 'department/action';
import { FormikSubmit } from 'type/Form';


function Element() {

  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.department);
  const id = useId();
  const upsert = useCallback((formikProps: FormikSubmit<DepartmentParameter>) =>
      dispatch(departmentAction.upsert(formikProps)),
    [dispatch]);

  const formik = useFormik<DepartmentVO>({
    enableReinitialize: true,
    initialValues:      detail && detail.id === id ? detail : initialDepartment,
    onSubmit:           (values,
                         helpers
                        ) => {
      upsert({ values, ...helpers });
    }
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'department/id/set',
        id
      });
    }
  }, [id]);

  return (
    <DepartmentDetail
      formik={formik}
    />
  );
}

const departmentDetailRoute: AppRoute = {
  path:    '/admin/department-management/:id',
  element: <Element />
};

export default departmentDetailRoute;