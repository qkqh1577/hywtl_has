import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import SelectField from 'components/SelectField';
import { ColorPalette } from 'app/view/App/theme';
import {
  projectContractStatusList,
  projectContractStatusName,
  projectEstimateExpectationList,
  projectEstimateExpectationName,
  projectEstimateStatusList,
  projectEstimateStatusName,
  projectProgressStatusList,
  projectProgressStatusName
} from 'project_status/domain';

interface DataBoxProps {
  title: string;
  width: number;
  children: React.ReactNode;
  backgroundColor: string;
}

function DataBox(props: DataBoxProps) {
  return (
    <Box sx={{
      display:         'flex',
      flexWrap:        'wrap',
      flexDirection:   'column',
      alignContent:    'stretch',
      alignItems:      'center',
      backgroundColor: props.backgroundColor,
      padding:         '10px',
      borderRadius:    '5px',
      flex:            1,
    }}>
      <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>
        {props.title}
      </Typography>
      {props.children}
    </Box>
  );
}

interface Props {
  handleChangeEstimateExpectation?: (e) => void;
}

export default function ProjectContainerStatusBar({ handleChangeEstimateExpectation }: Props) {

  return (
    <Box sx={{
      display:                    'flex',
      width:                      'calc(50% - 10px)',
      flexWrap:                   'nowrap',
      justifyContent:             'space-between',
      '& > div:not(:last-child)': {
        marginRight: '8px'
      }
    }}>
      <DataBox
        title="진행 현황"
        width={10}
        backgroundColor={ColorPalette._d2e7fa}
        children={
          <SelectField
            required
            disableLabel
            variant="outlined"
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
        backgroundColor={ColorPalette._d2e7fa}
        children={
          <SelectField
            disableLabel
            variant="outlined"
            name="estimateExpectation"
            label="견적 분류"
            options={projectEstimateExpectationList.map((item) => ({
              key:  item as string,
              text: projectEstimateExpectationName(item)
            }))}
            onChange={handleChangeEstimateExpectation || function () {}}
          />
        }
      />
      <DataBox
        title="견적 상태"
        width={10}
        backgroundColor={ColorPalette._d2e7fa}
        children={
          <SelectField
            disableLabel
            variant="outlined"
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
        backgroundColor={ColorPalette._d2e7fa}
        children={
          <SelectField
            disableLabel
            variant="outlined"
            name="contractStatus"
            label="계약 상태"
            options={projectContractStatusList.map((item) => ({
              key:  item as string,
              text: projectContractStatusName(item)
            }))}
          />
        }
      />
    </Box>
  );
}
