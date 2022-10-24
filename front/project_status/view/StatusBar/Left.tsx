import React, { useMemo } from 'react';
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

function BidDataBox(props: Pick<Props,
  | 'onUpdate'
  | 'bidType'
  | 'estimateStatus'
  | 'bidStatus'>) {

  const {
          onUpdate,
          bidType,
          estimateStatus,
          bidStatus,
        } = props;

  const isBid = useMemo(() => bidType === ProjectBasicBidType.COMPANY || bidType === ProjectBasicBidType.G2B, [bidType]);
  const prevValue = isBid ? bidStatus : estimateStatus;

  return (
    <DataBox
      title={isBid ? '입찰 상태' : '견적 상태'}
      width={10}
      backgroundColor={ColorPalette._d2e7fa}
      children={
        <Select
          displayEmpty
          variant="outlined"
          value={prevValue ?? ''}
          onChange={(e) => {
            const value = e.target.value || undefined;
            if (value && prevValue !== value) {
              onUpdate({ [(isBid ? 'bidStatus' : 'estimateStatus')]: value });
            }
          }}>
          {!prevValue && (<MenuItem value="">선택</MenuItem>)}
          {(isBid ? projectBidStatusList : projectEstimateStatusList).map((item) => (
            <MenuItem key={item} value={item}>
              {isBid && projectBidStatusName(item as ProjectBidStatus)}
              {!isBid && projectEstimateStatusName(item as ProjectEstimateStatus)}
            </MenuItem>
          ))}
        </Select>
      }
    />
  );

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
        }
      />
      <DataBox
        title="견적 분류"
        width={10}
        backgroundColor={ColorPalette._d2e7fa}
        children={
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
        }
      />
      <BidDataBox
        key={bidType}
        bidType={bidType}
        bidStatus={bidStatus}
        estimateStatus={estimateStatus}
        onUpdate={onUpdate}
      />
      <DataBox
        title="계약 상태"
        width={10}
        backgroundColor={ColorPalette._d2e7fa}
        children={
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
        }
      />
    </Box>
  );
}
