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
import { FormikSubmit } from 'user/action';
import { BusinessParameter } from 'business/parameter';
import { businessAction } from 'business/action';
import { useFormik } from 'formik';
import {
  initialBusiness
} from 'business/domain';
import BusinessDetail, {
  FormValues
} from 'business/view/Detail';
import { RegistrationNumberCheckButtonProps } from 'business/view/Detail/Form/RegistrationNumberCheckButton';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.business);
  const upsert = useCallback((formikProps: FormikSubmit<BusinessParameter>) => {
    dispatch(businessAction.upsert(formikProps));
  }, [dispatch]);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues:      detail ? { edit: false, ...detail } : { edit: true, ...initialBusiness },
    onSubmit:           (values,
                         helpers
                        ) => {
      upsert({ values, ...helpers });
    }
  });

  const handleRegistrationNumberSubmit: RegistrationNumberCheckButtonProps['handleRegistrationNumberSubmit'] = useCallback(
    (registrationNumber) => {

    }, []);

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'business/id/set',
        id
      });
    }
  }, [id]);

  return (
    <BusinessDetail
      formik={formik}
      handleRegistrationNumberSubmit={handleRegistrationNumberSubmit}
    />
  );
}

const businessDetailRoute: AppRoute = {
  path:    '/business-management/:id',
  element: <Element />,
};

export default businessDetailRoute;
