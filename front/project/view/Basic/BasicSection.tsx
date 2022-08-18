import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { Grid } from '@mui/material';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { FormikPartial } from 'type/Form';
import {
  projectEstimateTypeList,
  projectEstimateTypeName,
  ProjectVO
} from 'project/domain';
import TextField from 'components/TextField';
import { FieldStatus } from 'components/DataFieldProps';
import SelectField from 'components/SelectField';
import UserSelector from 'components/UserSelector';

export default function ProjectBasicSection(props: FormikLayoutProps<FormikPartial<ProjectVO>>) {

  return (
    <SectionLayout
      title="기본 정보"
      formik={props.formik}
    >
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <TextField
            status={FieldStatus.Disabled}
            name="code"
            label="프로젝트 번호"
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            required
            name="alias"
            label="프로젝트 닉네임"
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            name="name"
            label="프로젝트 풀네임"
          />
        </Grid>
        <Grid item sm={3}>
          <SelectField
            required
            name="estimateType"
            label="견적 구분"
            options={projectEstimateTypeList.map((item) => ({
              key:  item as string,
              text: projectEstimateTypeName(item),
            }))}
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            required
            name="receptionManager.id"
            label="문의 접수자"
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            name="salesManager.id"
            label="영업 담당자"
          />
        </Grid>
        <Grid item sm={3}>
          <UserSelector
            name="projectManager.id"
            label="담당 PM"
          />
        </Grid>
        <Grid item sm={3}>
          예상 착수 시기 TBD
        </Grid>
        <Grid item sm={3}>
          요청 일정 TBD
        </Grid>
        <Grid item sm={3}>
          <SelectField
            name="isLh"
            label="LH 여부"
            options={[{
              key:  'true',
              text: '예'
            }, {
              key:  'false',
              text: '아니오'
            }]}
          />
        </Grid>
      </Grid>
    </SectionLayout>
  );
}