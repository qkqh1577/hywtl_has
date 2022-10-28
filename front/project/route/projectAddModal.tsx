import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectAddModal from 'project/view/Drawer/AddModal';
import { projectAction } from 'project/action';
import {
  initialProjectQuery,
  memoLabelList,
  ProjectAddParameter
} from 'project/parameter';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { RootState } from 'services/reducer';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectAddModalRoute() {
  const dispatch = useDispatch();
  const { requestAdd, addModal } = useSelector((root: RootState) => root.project);
  const addProject = useCallback((formikProps: ProjectAddParameter) => dispatch(projectAction.add(formikProps)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectAction.setAddModal(false)), [dispatch]);
  const formik = useFormik<ProjectAddParameter>({
    initialValues: {} as ProjectAddParameter,
    onSubmit:      (values) => {
      const memo = memoLabelList.map((label,
                                      i
      ) => {
        const value = values[`memo_${i}`];
        if (!value) {
          return null;
        }
        return `${label}: ${value}`;
      })
                                .filter(value => value !== null)
                                .join('\n');
      addProject({
        name:               values.name,
        alias:              values.alias,
        receptionManagerId: values.receptionManagerId,
        progressStatus:     values.progressStatus,
        bidType:            values.bidType,
        memo,
      });
    }
  });

  useEffect(() => {
    closeStatus(requestAdd, () => {
      dispatch(projectAction.setAddModal(false));
      dispatch(projectAction.setFilter(initialProjectQuery));
    }, () => {
      dispatch(projectAction.requestAdd('idle'));
    });
  }, [requestAdd]);

  return (
    <FormikProvider value={formik}>
      <ProjectAddModal
        open={addModal}
        onClose={onClose}
      />
    </FormikProvider>
  );
}
