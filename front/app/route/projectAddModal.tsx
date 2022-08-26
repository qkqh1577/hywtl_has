import React, {
  useCallback,
  useState
} from 'react';
import ProjectAddModal from 'app/view/App/ProjectDrawer/AddModal';
import { projectAction } from 'project/action';
import {
  FormikPartial,
  FormikSubmit
} from 'type/Form';
import {
  initialProjectAddParameter,
  ProjectAddParameter
} from 'project/parameter';
import {
  useDispatch,
} from 'react-redux';
import { useFormik } from 'formik';
import { Button } from '@mui/material';

export default function ProjectAddModalRoute() {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const addProject = useCallback((formikProps: FormikSubmit<FormikPartial<ProjectAddParameter>>) =>
      dispatch(projectAction.add(formikProps))
    , [dispatch]);

  const addModalFormik = useFormik<FormikPartial<ProjectAddParameter>>({
    initialValues: initialProjectAddParameter,
    onSubmit:      (values,
                    helper
                   ) => {
      addProject({
        values,
        ...helper,
      });
    }
  });
  const onClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Button onClick={onClick}>신규 프로젝트 등록</Button>
      <ProjectAddModal
        open={open}
        setOpen={setOpen}
        formik={addModalFormik}
      />
    </>

  );
}
