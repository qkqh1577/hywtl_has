import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  ProjectContractStatus,
  ProjectEstimateExpectation,
  ProjectEstimateStatus,
  ProjectProgressStatus,
  projectProgressStatusList,
  projectProgressStatusName
} from 'project/domain';
import { TestType } from 'estimate_template/domain';
import { Box } from '@mui/material';
import SelectField from 'components/SelectField';

interface ProjectStatus {
  progressStatus: ProjectProgressStatus | '';
  estimateExpectation: ProjectEstimateExpectation | '';
  estimateStatus: ProjectEstimateStatus | '';
  contractStatus: ProjectContractStatus | '';
  testType?: TestType[];
  progress: number | '';
  amount: number | '';
}

export interface ProjectStatusBarProps
  extends FormikLayoutProps<ProjectStatus> {
}

export default function ProjectStatusBar(props: ProjectStatusBarProps) {

  return (
    <SectionLayout
      formik={props.formik}
      body={
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: 'space-around'
        }}>
          <SelectField
            name="progressStatus"
            label="진행 현황"
            options={projectProgressStatusList.map((item) => ({
              key:  item as string,
              text: projectProgressStatusName(item)
            }))}
          />
          <SelectField
            name="estimateExpectation"
            label="견적 분류"
            options={projectProgressStatusList.map((item) => ({
              key:  item as string,
              text: projectProgressStatusName(item)
            }))}
          />
          <SelectField
            name="estimateStatus"
            label="견적 상태"
            options={projectProgressStatusList.map((item) => ({
              key:  item as string,
              text: projectProgressStatusName(item)
            }))}
          />
          <SelectField
            name="contractStatus"
            label="계약 상태"
            options={projectProgressStatusList.map((item) => ({
              key:  item as string,
              text: projectProgressStatusName(item)
            }))}
          />
        </Box>
      }
    />
  );
}