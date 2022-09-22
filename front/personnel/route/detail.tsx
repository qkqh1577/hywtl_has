import React, {
  useCallback,
  useEffect
} from 'react';
import { AppRoute } from 'services/routes';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import useId from 'services/useId';
import { RootState } from 'services/reducer';
import { FormikSubmit } from 'type/Form';
import { PersonnelParameter } from 'personnel/parameter';
import {
  PersonnelAction,
  personnelAction
} from 'personnel/action';
import { useFormik } from 'formik';
import {
  initialPersonnelVO,
  PersonnelId,
  PersonnelVO
} from 'personnel/domain';
import {
  toPersonnelAcademy,
  toPersonnelBasic,
  toPersonnelCareer,
  toPersonnelCompany,
  toPersonnelJob,
  toPersonnelLanguage,
  toPersonnelLicense
} from 'personnel/converter/convertVoToParameter';
import PersonnelDetail from 'personnel/view/Detail';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const {
          basic,
          company,
          jobList,
          academicList,
          careerList,
          licenseList,
          languageList
        } = useSelector((root: RootState) => root.personnel);
  const personnelVO: PersonnelVO = {
    basic,
    company,
    jobList:      jobList || [],
    academicList: academicList || [],
    careerList:   careerList || [],
    licenseList:  licenseList || [],
    languageList: languageList || []
  };
  const update = useCallback((formikProps: FormikSubmit<PersonnelParameter>) =>
    dispatch(personnelAction.update(formikProps)), [dispatch]);

  const formik = useFormik<PersonnelVO>({
    enableReinitialize: true,
    initialValues:      initialPersonnelVO,
    onSubmit:           (values,
                         helpers
                        ) => {
      update({
        values: {
          id:           PersonnelId(id!),
          basic:        toPersonnelBasic(values.basic!),
          company:      toPersonnelCompany(values.company!),
          jobList:      values.jobList.map((item) => toPersonnelJob(item)),
          academicList: values.academicList.map((item) => toPersonnelAcademy(item)),
          careerList:   values.careerList.map((item) => toPersonnelCareer(item)),
          licenseList:  values.licenseList.map((item) => toPersonnelLicense(item)),
          languageList: values.languageList.map((item) => toPersonnelLanguage(item)),
        }, ...helpers
      });
    }
  });

  useEffect(() => {
    if (id) {
      dispatch({
        type: PersonnelAction.setId,
        id
      });
    }
  }, [id]);
  console.log('formik : ', formik);
  return (
    <PersonnelDetail
      formik={formik}
      personnelVO={personnelVO}
    />
  );
}

const personnelDetailRoute: AppRoute = {
  path:    '/user/hr-card-management/:id',
  element: <Element />
};

export default personnelDetailRoute;
