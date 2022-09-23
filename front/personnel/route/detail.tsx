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
import {
  FormikEditable,
  FormikSubmit
} from 'type/Form';
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
} from 'personnel/util/convertVoToParameter';
import PersonnelDetail from 'personnel/view/Detail';
import { toOption } from 'personnel/util/convertToOption';

function Element() {
  const id = useId();
  const dispatch = useDispatch();
  const {
          account,
          basic,
          company,
          jobList,
          academicList,
          careerList,
          licenseList,
          languageList
        } = useSelector((root: RootState) => root.personnel);
  const personnelVO: FormikEditable<PersonnelVO> = {
    account,
    basic,
    company,
    jobList:      jobList || [],
    academicList: academicList || [],
    careerList:   careerList || [],
    licenseList:  licenseList || [],
    languageList: languageList || [],
    edit:         false,
  };
  const { list } = useSelector((root: RootState) => root.department);

  const update = useCallback((formikProps: FormikSubmit<PersonnelParameter>) => {
    return dispatch(personnelAction.update(formikProps));
  }, [dispatch]);
  const formik = useFormik<FormikEditable<PersonnelVO>>({
    enableReinitialize: true,
    initialValues:      personnelVO || initialPersonnelVO,
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
  const edit = formik.values.edit;
  useEffect(() => {
    if (id) {
      dispatch({
        type: 'department/list/request'
      });
      dispatch({
        type: PersonnelAction.setId,
        id
      });
    }
  }, [id]);

  return (
    <PersonnelDetail
      formik={formik}
      edit={edit}
      list={toOption(list || [])}
    />
  );
}

const personnelDetailRoute: AppRoute = {
  path:    '/user/hr-card-management/:id',
  element: <Element />
};

export default personnelDetailRoute;
