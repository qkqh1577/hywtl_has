import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import {
  Box,
  MenuItem
} from '@mui/material';
import {
  ProjectBasicBidType,
  projectBasicBidTypeList,
  projectBasicBidTypeName
} from 'project_status/domain';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { ProjectBasicParameter } from 'project_basic/parameter';
import Select from 'layouts/Select';
import UserSelector from 'components/UserSelector';
import { ProjectBasic } from 'project_basic/domain';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Props {
  basic?: ProjectBasic;
  onUpdate: (params: ProjectBasicParameter) => void;
}

export default function ProjectBasicBasicSection({ basic, onUpdate }: Props) {

  return (
    <SectionLayout
      title="기본 정보"
      modifiedAt={basic?.modifiedAt}
    >
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        <Box sx={{
          width:          '100%',
          display:        'flex',
          flexWrap:       'nowrap',
          marginBottom:   '10px',
          justifyContent: 'space-between',
        }}>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="프로젝트 번호">
              <Input
                readOnly
                key={basic?.code}
                defaultValue={basic?.code ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="프로젝트 닉네임">
              <Input
                key={basic?.alias}
                defaultValue={basic?.alias ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (basic?.alias !== value) {
                    onUpdate({ alias: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc(100% / 5 * 2)' }}>
            <DataFieldWithLabel label="프로젝트 풀네임">
              <Input
                key={basic?.name}
                defaultValue={basic?.name ?? ''}
                onBlur={(e) => {
                  const value = e.target.value || undefined;
                  if (basic?.name !== value) {
                    onUpdate({ name: value });
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
        <Box sx={{
          width:          '100%',
          display:        'flex',
          flexWrap:       'nowrap',
          marginBottom:   '10px',
          justifyContent: 'space-between',
        }}>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="견적 구분">
              <Select
                value={basic?.bidType ?? ''}
                onChange={(e) => {
                  const value = e.target.value as ProjectBasicBidType || undefined;
                  if (basic?.bidType !== value) {
                    onUpdate({ bidType: value });
                  }
                }}>
                {projectBasicBidTypeList.map(item => (
                  <MenuItem key={item} value={item}>
                    {projectBasicBidTypeName(item)}
                  </MenuItem>
                ))}
              </Select>
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="문의 접수자">
              <UserSelector
                value={basic?.receptionManager?.id ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (basic?.receptionManager?.id !== value) {
                    onUpdate({ receptionManagerId: value } as ProjectBasicParameter);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="영업 담당자">
              <UserSelector
                value={basic?.salesManager?.id ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (basic?.salesManager?.id !== value) {
                    onUpdate({ salesManagerId: value } as ProjectBasicParameter);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="담당 PM">
              <UserSelector
                value={basic?.projectManager?.id ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (basic?.projectManager?.id !== value) {
                    onUpdate({ projectManagerId: value } as ProjectBasicParameter);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
        <Box sx={{
          width:          '100%',
          display:        'flex',
          flexWrap:       'nowrap',
          marginBottom:   '10px',
          justifyContent: 'space-between',
        }}>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="예상 착수 시기">
              <DatePicker
                openTo="year"
                inputFormat="YYYY-MM-DD"
                mask="____-__-__"
                value={basic?.expectedMonth ? dayjs(basic?.expectedMonth)
                .format('YYYY-MM-DD') : null}
                onChange={(e) => {
                  const value = e ? dayjs(e)
                  .format('YYYY-MM-DD') : undefined;
                  const formikValue = basic?.expectedMonth ? dayjs(basic?.expectedMonth)
                  .format('YYYY-MM-DD') : undefined;
                  if (formikValue !== value) {
                    onUpdate({ expectedMonth: value });
                  }
                }}
                renderInput={(parameter) => (
                  <Input
                    {...parameter.InputProps}
                    inputRef={parameter.inputRef}
                    variant="standard"
                    value={parameter.value}
                    inputProps={parameter.inputProps}
                  />
                )}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="요청 일정">
              <DatePicker
                openTo="year"
                inputFormat="YYYY-MM-DD"
                mask="____-__-__"
                value={basic?.requestedMonth ? dayjs(basic?.requestedMonth)
                .format('YYYY-MM-DD') : null}
                onChange={(e) => {
                  const value = e ? dayjs(e)
                  .format('YYYY-MM-DD') : undefined;
                  const formikValue = basic?.requestedMonth ? dayjs(basic?.requestedMonth)
                  .format('YYYY-MM-DD') : undefined;
                  if (formikValue !== value) {
                    onUpdate({ requestedMonth: value });
                  }
                }}
                renderInput={(parameter) => (
                  <Input
                    {...parameter.InputProps}
                    inputRef={parameter.inputRef}
                    variant="standard"
                    value={parameter.value}
                    inputProps={parameter.inputProps}
                  />
                )}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: 'calc(100% / 5)' }}>
            <DataFieldWithLabel label="LH 여부">
              <Select
                value={basic?.isLh === null || typeof basic?.isLh === 'undefined' ? '' : (basic?.isLh ? 'Y' : 'N')}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (value === 'Y') {
                    onUpdate({ isLh: true });
                  }
                  else if (value === 'N') {
                    onUpdate({ isLh: false });
                  }
                  else {
                    onUpdate({ isLh: undefined });
                  }
                }}>
                <MenuItem value="Y">네</MenuItem>
                <MenuItem value="N">아니요</MenuItem>
              </Select>
            </DataFieldWithLabel>
          </Box>
        </Box>
      </Box>
    </SectionLayout>
  );
}
