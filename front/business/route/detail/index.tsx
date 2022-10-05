import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import useId from 'services/useId';
import React, {
  useCallback,
  useEffect
} from 'react';
import {
  BusinessParameter,
  initialBusinessParameter
} from 'business/parameter';
import { businessAction } from 'business/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { BusinessId } from 'business/domain';
import BusinessDetail from 'business/view/Detail';
import BusinessInvolvedProjectRoute from 'business/route/detail/involvedProject';
import BusinessRivalStatisticRoute from 'business/route/detail/rivalStatistic';
import BusinessRivalProjectListRoute from 'business/route/detail/rivalProject';
import useDialog from 'components/Dialog';
import { useNavigate } from 'react-router-dom';
import BusinessBasicRoute from 'business/route/detail/basic';
import { ApiStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alert, error, confirm, rollback } = useDialog();
  const { detail, requestDelete, requestUpsert } = useSelector((root: RootState) => root.business);
  const upsert = useCallback((formikProps: BusinessParameter) => {
    dispatch(businessAction.upsert(formikProps));
  }, [dispatch]);
  const deleteOne = useCallback((id: BusinessId) => dispatch(businessAction.deleteOne(id)), [dispatch]);

  const formik = useFormik<BusinessParameter>({
    initialValues: initialBusinessParameter,
    onSubmit:      (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(businessAction.setId(id ? BusinessId(id) : undefined));
  }, [id]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        edit: false,
      } as BusinessParameter);
    }
    else {
      formik.setValues(initialBusinessParameter);
    }
  }, [detail]);

  useEffect(() => {
    if (requestUpsert === ApiStatus.DONE) {
      alert('수정하였습니다.');
      formik.setSubmitting(false);
      dispatch(businessAction.setId(id ? BusinessId(id) : undefined));
      dispatch(businessAction.requestUpsert(ApiStatus.IDLE));
    }
    else if (requestUpsert === ApiStatus.FAIL) {
      error('수정에 실패하였습니다.');
      formik.setSubmitting(false);
      dispatch(businessAction.requestUpsert(ApiStatus.IDLE));
    }
  }, [requestUpsert]);

  useEffect(() => {
    if (requestDelete === ApiStatus.DONE) {
      alert('삭제하였습니다.');
      dispatch(businessAction.setId(undefined));
      dispatch(businessAction.requestDelete(ApiStatus.IDLE));
      navigate('/business-management');
    }
    else if (requestDelete === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(businessAction.requestDelete(ApiStatus.IDLE));
    }
  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <BusinessDetail
        basic={<BusinessBasicRoute />}
        involvedProjectList={<BusinessInvolvedProjectRoute />}
        rivalStatistic={<BusinessRivalStatisticRoute />}
        rivalProjectList={<BusinessRivalProjectListRoute />}
        onCancel={() => {
          rollback(() => {
            formik.setValues({
              ...detail,
              edit: false,
            } as BusinessParameter);
          });
        }}
        onDelete={() => {
          if (id) {
            confirm({
              status:       'warn',
              children:     '해당 업체 정보를 삭제하시겠습니까?',
              confirmText:  '삭제',
              afterConfirm: () => {
                deleteOne(BusinessId(id));
              }
            });
          }
          else {
            error('업체가 선택되지 않았습니다.');
          }
        }}
      />
    </FormikProvider>
  );
}

const businessDetailRoute: AppRoute = {
  path:    '/business-management/:id',
  element: <Element />,
};

export default businessDetailRoute;
