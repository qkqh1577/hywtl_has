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
import { BusinessParameter } from '../parameter';
import { businessAction } from '../action';
import { useFormik } from 'formik';
import {
  BusinessVO,
  initialBusiness
} from '../domain';
import BusinessDetail from 'business/view/Detail';

function Element() {
  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.business);
  const id = useId();
  const upsert = useCallback((formikProps: FormikSubmit<BusinessParameter>) => {
    dispatch(businessAction.upsert(formikProps));
  }, [dispatch]);

  const formik = useFormik<BusinessVO>({
    enableReinitialize: true,
    initialValues:      detail && detail.id === id ? detail : initialBusiness,
    onSubmit:           (values,
                         helpers
                        ) => {
      upsert({ values, ...helpers });
    }
  });

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
    />
  );
}

const businessDetailRoute: AppRoute = {
  path:    '/business/:id',
  element: <Element />,
};

export default businessDetailRoute;
