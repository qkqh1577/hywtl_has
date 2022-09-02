import {
  difficultyList,
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
import React from 'react';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectComplexSiteParameter } from 'project_complex/parameter';

export default function ProjectComplexSiteRow(props: ProjectComplexSiteVO & {
  onUpdate: (params: ProjectComplexSiteParameter) => void;
}) {

  const formik = useFormik<ProjectComplexSiteParameter & {
    environmentTest: string[];
  }>({
    enableReinitialize: true,
    initialValues:      {
      ...props,
      environmentTest: props.withEnvironmentTest ? ['E'] : []
    },
    onSubmit:           (values) => {
      const manager = (values as any).manager;
      if (typeof manager === 'object') {
        values.managerId = manager.id;
      }
      props.onUpdate(values);
    }
  });

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
        <Button shape="basic2">삭제</Button>
      </TableCell>
    </TableRow>
  );
}