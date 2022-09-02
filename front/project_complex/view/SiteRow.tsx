import {
  difficultyList,
  ProjectComplexSiteId,
  ProjectComplexSiteVO,
} from 'project_complex/domain';
import {
  TableCell,
  TableRow
} from '@mui/material';
import TextField from 'components/TextField';
import CheckboxField from 'components/CheckboxField';
import SelectField from 'components/SelectField';
import UserSelector from 'components/UserSelector';
import Button from 'layouts/Button';
import React, { useEffect } from 'react';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectComplexAction } from 'project_complex/action';

export default function ProjectComplexSiteRow(props: ProjectComplexSiteVO & {
  onUpdate: (params: ProjectComplexSiteParameter) => void;
  onDelete: (id: ProjectComplexSiteId) => void;
}) {

  const dispatch = useDispatch();
  const { requestSite } = useSelector((root: RootState) => root.projectComplex);
  const formik = useFormik<ProjectComplexSiteParameter & {
    environmentTest: string[];
  }>({
    enableReinitialize: true,
    initialValues:      {
      ...props,
      environmentTest: props.withEnvironmentTest ? ['E'] : []
    },
    onSubmit:           (values) => {
      console.log(values);
      const manager = (values as any).manager;
      if (manager && typeof manager === 'object') {
        values.managerId = manager.id;
      }
      props.onUpdate(values);
    }
  });

  useEffect(() => {
    if (requestSite === 'response') {
      formik.setSubmitting(false);
      dispatch(projectComplexAction.requestSite('idle'));
    }
  }, [requestSite]);

  return (
    <TableRow>
      <TableCell>
        <FormikProvider value={formik}>
          <TextField
            name="name"
            label="대지 모형"
            labelProps={{
              disableLabel: true,
            }}
            onBlur={() => {
              formik.handleSubmit();
            }}
          />
        </FormikProvider>
      </TableCell>
      <TableCell>
        <FormikProvider value={formik}>
          <CheckboxField
            name="environmentTest"
            label="실험 종류 E 여부"
            disableLabel
            disableAll
            options={['E']}
            onChange={() => {
              const value = formik.values.environmentTest;
              if (!value || value.length === 0) {
                formik.setFieldValue('withEnvironmentTest', true);
              }
              else {
                formik.setFieldValue('withEnvironmentTest', false);
              }
              formik.handleSubmit();
            }}
          />
        </FormikProvider>
      </TableCell>
      <TableCell>

        <FormikProvider value={formik}>
          <SelectField
            name="estimateFigureDifficulty"
            label="견적 대지모형 제작 난이도"
            options={difficultyList}
            labelProps={{
              disableLabel: true,
            }}
            onChange={() => {
              formik.handleSubmit();
            }}
          />
        </FormikProvider>

      </TableCell>
      <TableCell>
        <FormikProvider value={formik}>
          <SelectField
            name="figureDifficulty"
            label="대지모형 제작 난이도"
            options={difficultyList}
            labelProps={{
              disableLabel: true,
            }}
            onChange={() => {
              formik.handleSubmit();
            }}
          />
        </FormikProvider>
      </TableCell>
      <TableCell>
        <FormikProvider value={formik}>
          <UserSelector
            name="manager.id"
            label="담당자"
            labelProps={{
              disableLabel: true,
            }}
            onChange={() => {
              formik.handleSubmit();
            }}
          />
        </FormikProvider>
      </TableCell>
      <TableCell>
        <Button shape="basic2" onClick={() => {props.onDelete(props.id);}}>삭제</Button>
      </TableCell>
    </TableRow>
  );
}