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
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  DepartmentParameter,
  initialDepartmentParameter
} from 'department/parameter';
import { departmentAction } from 'department/action';
import { DepartmentId } from 'department/domain';
import useDialog from 'dialog/hook';
import { useNavigate } from 'react-router-dom';
import { DialogStatus } from 'dialog/domain';
import { closeStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { confirm, rollback } = useDialog();
  const { detail, requestUpsert, requestDelete } = useSelector((root: RootState) => root.department);
  const upsert = useCallback((formikProps: DepartmentParameter) => dispatch(departmentAction.upsert(formikProps)), [dispatch]);
  const deleteOne = useCallback((id: DepartmentId) => dispatch(departmentAction.deleteOne(id)), [dispatch]);
  const formik = useFormik<DepartmentParameter>({
    initialValues: initialDepartmentParameter,
    onSubmit:      (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(departmentAction.setId(id ? DepartmentId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        id:       detail.id,
        name:     detail.name,
        category: detail.category,
        parent:   detail.parent,
        parentId: detail.parentId ?? detail.parent?.id,
        note:     detail.note,
        edit:     false,
      } as unknown as DepartmentParameter);
    }
    else {
      formik.setValues({ ...initialDepartmentParameter });
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestUpsert, () => {
      if (id) {
        dispatch(departmentAction.setId(DepartmentId(id)));
      }
      else {
        navigate('/admin/department-management');
      }
    }, () => {
      formik.setSubmitting(false);
      dispatch(departmentAction.requestUpsert('idle'));
    });
  }, [requestUpsert]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      dispatch(departmentAction.setId(undefined));
      navigate('/admin/department-management');
    }, () => {
      dispatch(departmentAction.requestDelete('idle'));
    });
  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <DepartmentDetail
        onCancel={() => {
          rollback(() => {
            if (detail) {
              formik.setValues({
                id:       detail.id,
                name:     detail.name,
                parent:   detail.parent,
                parentId: detail.parentId ?? detail.parent?.id,
                note:     detail.note,
                edit:     false,
              } as unknown as DepartmentParameter);
            }
            else {
              navigate('/admin/department-management');
            }
          });
        }}
        onDelete={() => {
          if (id) {
            confirm({
              status:       DialogStatus.WARN,
              children:     '?????? ?????? ????????? ?????????????????????????',
              confirmText:  '??????',
              afterConfirm: () => {
                deleteOne(DepartmentId(id));
              }
            });
          }
        }}
      />
    </FormikProvider>
  );
}

const departmentDetailRoute: AppRoute = {
  path:    '/admin/department-management/:id',
  element: <Element />
};

export default departmentDetailRoute;