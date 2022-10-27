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

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, alert, confirm, rollback } = useDialog();
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
    if (requestUpsert === 'done') {
      alert('저장하였습니다.');
      formik.setSubmitting(false);
      dispatch(departmentAction.requestUpsert('idle'));
      if (id) {
        dispatch(departmentAction.setId(DepartmentId(id)));
      }
      else {
        navigate('/admin/department-management');
      }
    }
    else if (requestUpsert === message) {
      error('저장에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(departmentAction.requestUpsert('idle'));
    }
  }, [requestUpsert]);

  useEffect(() => {
    if (requestDelete === 'done') {
      alert('삭제하였습니다.');
      dispatch(departmentAction.setId(undefined));
      dispatch(departmentAction.requestDelete('idle'));
      navigate('/admin/department-management');
    }
    else if (requestDelete === message) {
      error('삭제에 실패하였습니다.');
      dispatch(departmentAction.requestDelete('idle'));
    }
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
              children:     '해당 조직 정보를 삭제하시겠습니까?',
              confirmText:  '삭제',
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