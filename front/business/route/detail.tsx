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
import { useFormik } from 'formik';
import {
  initialBusiness
} from 'business/domain';
import BusinessDetail, {
  FormValues
} from 'business/view/Detail';
import { FormikSubmit } from 'type/Form';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail, involvedProjectList, rivalProjectList } = useSelector((root: RootState) => root.business);
  const checkRegistrationNumber = useCallback((registrationNumber: string) =>
      dispatch(businessAction.setRegistrationNumber(registrationNumber))
    , [dispatch]);
  const upsert = useCallback((formikProps: FormikSubmit<BusinessParameter>) => {
    dispatch(businessAction.upsert(formikProps));
  }, [dispatch]);

  const isDetail = detail && detail.id === id;

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues:      detail ? { edit: false, ...detail } : { edit: true, ...initialBusiness },
    onSubmit:           (values,
                         helpers
                        ) => {
      upsert({ values, ...helpers });
    }
  });
  const edit = formik.values.edit;

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'business/id/set',
        id
      });
    }
    else {
      dispatch(businessAction.setOne(undefined));
    }
  }, [id]);

  return (
    <BusinessDetail
      formik={formik}
      handleRegistrationNumberSubmit={checkRegistrationNumber}
      involvedProjectList={isDetail && !edit ? involvedProjectList : undefined}
      rivalProjectList={isDetail && !edit ? rivalProjectList : undefined}
      businessName={formik.values.name}
    />
  );
}

const businessDetailRoute: AppRoute = {
  path:    '/business-management/:id',
  element: <Element />,
};

export default businessDetailRoute;
