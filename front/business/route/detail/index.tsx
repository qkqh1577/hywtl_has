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
import useDialog from 'dialog/hook';
import { useNavigate } from 'react-router-dom';
import BusinessBasicRoute from 'business/route/detail/basic';
import { DialogStatus } from 'dialog/domain';
import { closeStatus } from 'components/DataFieldProps';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, confirm, rollback } = useDialog();
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
    closeStatus(requestUpsert, () => {
      if (id) {
        dispatch(businessAction.setId(BusinessId(id)));
      }
      else {
        navigate('/business-management');
      }
    }, () => {
      dispatch(businessAction.requestUpsert('idle'));
      formik.setSubmitting(false);
    });
  }, [requestUpsert]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      dispatch(businessAction.setId(undefined));
      navigate('/business-management');
    }, () => {
      dispatch(businessAction.requestDelete('idle'));
    });
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
              status:       DialogStatus.WARN,
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
