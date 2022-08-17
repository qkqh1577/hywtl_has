import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import {
  ProjectContractStatus,
  projectContractStatusList,
  projectContractStatusName,
  ProjectEstimateExpectation,
  projectEstimateExpectationList,
  projectEstimateExpectationName,
  ProjectEstimateStatus,
  projectEstimateStatusList,
  projectEstimateStatusName,
  ProjectProgressStatus,
  projectProgressStatusList,
  projectProgressStatusName
} from 'project/domain';
import { TestType } from 'estimate_template/domain';
import {
  Box,
  Typography
} from '@mui/material';
import SelectField from 'components/SelectField';

interface DataBoxProps {
  title: string;
  width: number;
  children: React.ReactNode;
}

function DataBox(props: DataBoxProps) {
  return (
    <Box sx={{
      display:         'flex',
      flexWrap:        'wrap',
      width:           `${props.width}%`,
      flexDirection:   'column',
      alignContent:    'stretch',
      alignItems:      'center',
      backgroundColor: '#ccc',
      padding:         '4px 12px',
    }}>
      <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>
        {props.title}
      </Typography>
      {props.children}
    </Box>
  );
}

export interface ProjectStatus {
  progressStatus: ProjectProgressStatus | '';
  estimateExpectation: ProjectEstimateExpectation | '';
  estimateStatus: ProjectEstimateStatus | '';
  contractStatus: ProjectContractStatus | '';
  testType?: TestType[];
  progress: number | '';
  amount: number | '';
}

export const initialProjectStatus: ProjectStatus = {
  progressStatus:      '',
  estimateExpectation: '',
  estimateStatus:      '',
  contractStatus:      '',
  progress:            '',
  amount:              ''
};

export interface ProjectContainerStatusBar
  extends FormikLayoutProps<ProjectStatus> {
}

export default function ProjectContainerStatusBar() {

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      flexWrap:       'nowrap',
      justifyContent: 'space-around'
    }}>
      <DataBox
        title="진행 현황"
        width={10}
        children={
          <SelectField
            disableLabel
            name="progressStatus"
            label="진행 현황"
            options={projectProgressStatusList.map((item) => ({
              key:  item as string,
              text: projectProgressStatusName(item)
            }))}
          />
        }
      />
      <DataBox
        title="견적 분류"
        width={10}
        children={
          <SelectField
            disableLabel
            name="estimateExpectation"
            label="견적 분류"
            options={projectEstimateExpectationList.map((item) => ({
              key:  item as string,
              text: projectEstimateExpectationName(item)
            }))}
          />
        }
      />
      <DataBox
        title="견적 상태"
        width={10}
        children={
          <SelectField
            disableLabel
            name="estimateStatus"
            label="견적 상태"
            options={projectEstimateStatusList.map((item) => ({
              key:  item as string,
              text: projectEstimateStatusName(item)
            }))}
          />
        }
      />
      <DataBox
        title="계약 상태"
        width={10}
        children={
          <SelectField
            disableLabel
            name="contractStatus"
            label="계약 상태"
            options={projectContractStatusList.map((item) => ({
              key:  item as string,
              text: projectContractStatusName(item)
            }))}
          />
        }
      />
      <DataBox
        title="실험 종류"
        width={6}
        children={
          <Box>TBD</Box>
        }
      />
      <DataBox
        title="진행율"
        width={6}
        children={
          <Box>TBD</Box>
        }
      />
      <DataBox
        title="계약 금액"
        width={10}
        children={
          <Box>TBD</Box>
        }
      />
      <DataBox
        title="최근 수금"
        width={20}
        children={
          <Box>TBD</Box>
        }
      />
    </Box>
  );
}
