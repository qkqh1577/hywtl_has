import React from 'react';
import {
  Box,
  MenuItem,
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
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
  projectProgressStatusName,
  ProjectStatus
} from 'project/domain';
import Select from 'layouts/Select';
import DataBox from 'project_status/view/StatusBar/DataBox';

interface Props {
  status: ProjectStatus | undefined;
  onChange: (status: ProjectStatus) => void;
}

export default function ProjectStatusLeftBar({ status, onChange }: Props) {

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
          <Select
            variant="outlined"
            value={status?.progressStatus ?? ''}
            onChange={(e) => {
              onChange({ progressStatus: e.target.value as ProjectProgressStatus });
            }}>
            {projectProgressStatusList.map((item) => (
              <MenuItem key={item} value={item}>{projectProgressStatusName(item)}</MenuItem>
            ))}
          </Select>
        }
      />
      <DataBox
        title="견적 분류"
        width={10}
        backgroundColor={ColorPalette._d2e7fa}
        children={
          <Select
            variant="outlined"
            value={status?.estimateExpectation || '선택'}
            onChange={(e) => {
              onChange({ estimateExpectation: e.target.value as ProjectEstimateExpectation });
            }}
          >
            {!status?.estimateExpectation && <MenuItem key="" value="선택">선택</MenuItem>}
            {projectEstimateExpectationList.map((item) => (
              <MenuItem key={item} value={item}>{projectEstimateExpectationName(item)}</MenuItem>
            ))}
          </Select>
        }
      />
      <DataBox
        title="견적 상태"
        width={10}
        backgroundColor={ColorPalette._d2e7fa}
        children={
          <Select
            variant="outlined"
            value={status?.estimateStatus || '선택'}
            onChange={(e) => {
              onChange({ estimateStatus: e.target.value as ProjectEstimateStatus });
            }}
          >
            {!status?.estimateStatus && <MenuItem key="" value="선택">선택</MenuItem>}
            {projectEstimateStatusList.map((item) => (
              <MenuItem key={item} value={item}>{projectEstimateStatusName(item)}</MenuItem>
            ))}
          </Select>
        }
      />
      <DataBox
        title="계약 상태"
        width={10}
        backgroundColor={ColorPalette._d2e7fa}
        children={
          <Select
            variant="outlined"
            value={status?.contractStatus || '선택'}
            onChange={(e) => {
              onChange({ contractStatus: e.target.value as ProjectContractStatus });
            }}
          >
            {!status?.contractStatus && <MenuItem key="" value="선택">선택</MenuItem>}
            {projectContractStatusList.map((item) => (
              <MenuItem key={item} value={item}>{projectContractStatusName(item)}</MenuItem>
            ))}
          </Select>
        }
      />
    </Box>
  );
}
