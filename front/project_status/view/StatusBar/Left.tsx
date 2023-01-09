import React from 'react';
import {
  Box,
  MenuItem,
} from '@mui/material';
import { ColorPalette } from 'assets/theme';
import {
  ProjectBasicBidType,
  ProjectBidStatus,
  projectBidStatusList,
  projectBidStatusName,
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
  onUpdate: (status: ProjectStatus) => void;
  bidType: ProjectBasicBidType | undefined;
  progressStatus: ProjectProgressStatus | undefined;
  estimateExpectation: ProjectEstimateExpectation | undefined;
  estimateStatus: ProjectEstimateStatus | undefined;
  contractStatus: ProjectContractStatus | undefined;
  bidStatus: ProjectBidStatus | undefined;
}

export default function ProjectStatusLeftBar({
                                               onUpdate,
                                               bidType,
                                               progressStatus,
                                               estimateExpectation,
                                               estimateStatus,
                                               contractStatus,
                                               bidStatus,
                                             }: Props) {

  return (
    <Box sx={{
      display:        'flex',
      width:          'calc(50% - 10px)',
      flexWrap:       'nowrap',
      justifyContent: 'space-between',
      '&> div':       {
        backgroundColor: ColorPalette._d2e7fa,
        width:           '120px',
      },
    }}>
      <DataBox title="진행 현황">
        <Select
          displayEmpty
          variant="outlined"
          value={progressStatus ?? ''}
          onChange={(e) => {
            const value = e.target.value as ProjectProgressStatus || undefined;
            if (value && progressStatus !== value) {
              onUpdate({ progressStatus: value });
            }
          }}>
          {!progressStatus && (<MenuItem value="">선택</MenuItem>)}
          {projectProgressStatusList.map((item) => (
            <MenuItem key={item} value={item}>{projectProgressStatusName(item)}</MenuItem>
          ))}
        </Select>
      </DataBox>
      <DataBox title="견적 분류">
        <Select
          displayEmpty
          variant="outlined"
          value={estimateExpectation ?? ''}
          onChange={(e) => {
            const value = e.target.value as ProjectEstimateExpectation || undefined;
            if (value && estimateExpectation !== value) {
              onUpdate({ estimateExpectation: value });
            }
          }}>
          {!estimateExpectation && (<MenuItem value="">선택</MenuItem>)}
          {projectEstimateExpectationList.map((item) => (
            <MenuItem key={item} value={item}>{projectEstimateExpectationName(item)}</MenuItem>
          ))}
        </Select>
      </DataBox>
      <DataBox title="견적 상태">
        <Select
          displayEmpty
          variant="outlined"
          value={estimateStatus ?? ''}
          onChange={(e) => {
            const value = e.target.value as ProjectEstimateStatus || undefined;
            if (value && estimateStatus !== value) {
              onUpdate({ estimateStatus: value });
            }
          }}>
          {!estimateStatus && (<MenuItem value="">선택</MenuItem>)}
          {projectEstimateStatusList.map((item) => (
            <MenuItem key={item} value={item}>
              {projectEstimateStatusName(item as ProjectEstimateStatus)}
            </MenuItem>
          ))}
        </Select>
      </DataBox>
      {bidType && (
        <DataBox title="입찰 상태">
          <Select
            displayEmpty
            variant="outlined"
            value={bidStatus ?? ''}
            onChange={(e) => {
              const value = e.target.value as ProjectBidStatus || undefined;
              if (value && bidStatus !== value) {
                onUpdate({ bidStatus: value });
              }
            }}>
            {!bidStatus && (<MenuItem value="">선택</MenuItem>)}
            {projectBidStatusList.map((item) => (
              <MenuItem key={item} value={item}>
                {projectBidStatusName(item as ProjectBidStatus)}
              </MenuItem>
            ))}
          </Select>
        </DataBox>
      )}
      <DataBox title="계약 상태">
        <Select
          displayEmpty
          variant="outlined"
          value={contractStatus ?? ''}
          onChange={(e) => {
            const value = e.target.value as ProjectContractStatus || undefined;
            if (value && contractStatus !== value) {
              onUpdate({ contractStatus: value });
            }
          }}>
          {!contractStatus && (<MenuItem value="">선택</MenuItem>)}
          {projectContractStatusList.map((item) => (
            <MenuItem key={item} value={item}>{projectContractStatusName(item)}</MenuItem>
          ))}
        </Select>
      </DataBox>
    </Box>
  );
}
