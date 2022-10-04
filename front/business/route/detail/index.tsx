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
import { BusinessParameter } from 'business/parameter';
import { businessAction } from 'business/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  BusinessId,
  initialBusiness
} from 'business/domain';
import BusinessDetail, { FormValues } from 'business/view/Detail';
import BusinessInvolvedProjectRoute from 'business/route/detail/involvedProject';
import BusinessRivalStatisticRoute from 'business/route/detail/rivalStatistic';
import BusinessRivalProjectListRoute from 'business/route/detail/rivalProject';
import useDialog from 'components/Dialog';
import { useNavigate } from 'react-router-dom';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alert, error, confirm } = useDialog();
  const { detail } = useSelector((root: RootState) => root.business);
  const checkRegistrationNumber = useCallback((registrationNumber: string) =>
      dispatch(businessAction.setRegistrationNumber(registrationNumber))
    , [dispatch]);
  const upsert = useCallback((formikProps: BusinessParameter) => {
    dispatch(businessAction.upsert(formikProps));
  }, [dispatch]);
  const deleteOne = useCallback((id: BusinessId) => dispatch(businessAction.deleteOne(id)), [dispatch]);


  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues:      detail ? { edit: false, ...detail } : { edit: true, ...initialBusiness },
    onSubmit:           (values) => {
      upsert(values);
    }
  });

  useEffect(() => {
    dispatch(businessAction.setId(id ? BusinessId(id) : undefined));
  }, [id]);

  return (
    <FormikProvider value={formik}>
      <BusinessDetail
        handleRegistrationNumberSubmit={checkRegistrationNumber}
        involvedProjectList={<BusinessInvolvedProjectRoute />}
        rivalStatistic={<BusinessRivalStatisticRoute />}
        rivalProjectList={<BusinessRivalProjectListRoute />}
        onCancel={() => {

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
            alert('업체가 선택되지 않았습니다.');
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
