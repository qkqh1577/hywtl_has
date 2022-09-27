import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';
import React, { useEffect } from 'react';
import ProjectBasicBasicSection from 'project_basic/view/BasicSection';
import { projectBasicActionType } from 'project_basic/action';

export default function ProjectBasicBasicRoute() {
  const dispatch = useDispatch();
  const { basic } = useSelector((root: RootState) => root.projectBasic);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:      {
      code: basic?.code || '',
      alias: basic?.alias || '',
      name: basic?.name || '',
      bidType: basic?.bidType || '',
      receptionManagerId: basic?.receptionManager.id || '',
      salesManagerId: basic?.salesManager?.id || '',
      projectManagerId: basic?.projectManager?.id || '',
      isLh: !basic?.isLh ? '' : basic?.isLh ? 'true' : 'false',
    },
    onSubmit:           (values) => {
      console.log(values);
    }
  });

  useEffect(() => {
    if (!basic?.bidType) {
      return;
    }
    dispatch(projectBasicActionType.setBidType(basic.bidType));
  }, [basic]);

  return (
    <FormikProvider value={formik}>
      <ProjectBasicBasicSection handleChangeBidType={(e) => {
        if (!e) {
          return;
        }
        dispatch(projectBasicActionType.setBidType(e.target.value));
      }} />
    </FormikProvider>
  );
}
