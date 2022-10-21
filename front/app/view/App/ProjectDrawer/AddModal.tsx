import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
  Button,
  Grid,
  MenuItem
} from '@mui/material';
import UserSelector from 'components/UserSelector';
import { ColorPalette } from 'app/view/App/theme';
import { memoLabelList } from 'app/route/projectAddModal';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';
import Input from 'layouts/Input';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Select from 'layouts/Select';
import {
  projectBasicBidTypeList,
  projectBasicBidTypeName,
  ProjectProgressStatus,
  projectProgressStatusName
} from 'project/domain';

export interface AddModalProps {
  open: boolean;
  onClose: DefaultFunction;
}

export default function ProjectAddModal({ open, onClose }: AddModalProps) {
  const formik = useContext(FormikContext);

  return (
    <ModalLayout
      open={open}
      title="신규 프로젝트 등록"
      onClose={onClose}
      width="45vw"
      children={
        <Box sx={{
          display:        'flex',
          width:          '100%',
          flexWrap:       'wrap',
          justifyContent: 'space-around',
          marginBottom:   '10px',
          alignItems:     'flex-start'
        }}>
          <Box sx={{
            display: 'flex',
            width:   '40%',
          }}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <DataFieldWithLabel required label="프로젝트 풀네임" labelPosition="top">
                  <Input
                    key={formik.values.name}
                    defaultValue={formik.values.name ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.name !== value) {
                        formik.setFieldValue('name', value);
                      }
                    }}
                  />
                </DataFieldWithLabel>
              </Grid>
              <Grid item sm={6}>
                <DataFieldWithLabel required label="프로젝트 닉네임" labelPosition="top">
                  <Input
                    key={formik.values.alias}
                    defaultValue={formik.values.alias ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.alias !== value) {
                        formik.setFieldValue('alias', value);
                      }
                    }}
                  />
                </DataFieldWithLabel>
              </Grid>
              <Grid item sm={6}>
                <DataFieldWithLabel required label="문의 접수자" labelPosition="top">
                  <UserSelector
                    value={formik.values.receptionManagerId ?? ''}
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.receptionManagerId !== value) {
                        formik.setFieldValue('receptionManagerId', value);
                      }
                    }}
                  />
                </DataFieldWithLabel>
              </Grid>
              <Grid item sm={6}>
                <DataFieldWithLabel required label="진행 현황" labelPosition="top">
                  <Select
                    value={formik.values.progressStatus ?? ''}
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.progressStatus !== value) {
                        formik.setFieldValue('progressStatus', value);
                      }
                    }}>
                    <MenuItem value={ProjectProgressStatus.TEMPORARY}>
                      {projectProgressStatusName(ProjectProgressStatus.TEMPORARY)}
                    </MenuItem>
                    <MenuItem value={ProjectProgressStatus.UNDER_CONTRACT}>
                      {projectProgressStatusName(ProjectProgressStatus.UNDER_CONTRACT)}
                    </MenuItem>
                  </Select>
                </DataFieldWithLabel>
              </Grid>
              <Grid item sm={6}>
                <DataFieldWithLabel required label="견적 구분" labelPosition="top">
                  <Select
                    value={formik.values.bidType ?? ''}
                    onChange={(e) => {
                      const value = e.target.value || undefined;
                      if (formik.values.bidType !== value) {
                        formik.setFieldValue('bidType', value);
                      }
                    }}>
                    {projectBasicBidTypeList.map(item => (
                      <MenuItem key={item} value={item}>
                        {projectBasicBidTypeName(item)}
                      </MenuItem>
                    ))}
                    <MenuItem value={ProjectProgressStatus.TEMPORARY}>
                      {projectProgressStatusName(ProjectProgressStatus.TEMPORARY)}
                    </MenuItem>
                    <MenuItem value={ProjectProgressStatus.UNDER_CONTRACT}>
                      {projectProgressStatusName(ProjectProgressStatus.UNDER_CONTRACT)}
                    </MenuItem>
                  </Select>
                </DataFieldWithLabel>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{
            display: 'flex',
            width:   '40%',
            height:  'calc(100% - 40px)',
            border:  `1px solid ${ColorPalette._e4e9f2}`,
          }}>
            <Grid container spacing={2}>
              {memoLabelList.map((label,
                                  i
              ) => (
                <Grid key={label} item sm={12}>
                  <DataFieldWithLabel label={label} labelPosition="top">
                    <Input
                      key={formik.values[`memo_${i}`]}
                      defaultValue={formik.values[`memo_${i}`] ?? ''}
                      onBlur={(e) => {
                        const value = e.target.value || undefined;
                        if (formik.values[`memo_${i}`] !== value) {
                          formik.setFieldValue(`memo_${i}`, value);
                        }
                      }}
                    />
                  </DataFieldWithLabel>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{
            display:        'flex',
            width:          '100%',
            height:         '30px',
            justifyContent: 'center'
          }}>
          </Box>
        </Box>
      }
      footer={
        <Box sx={{
          display:        'flex',
          width:          '100%',
          justifyContent: 'center'
        }}>
          <Button
            children="등록"
            onClick={() => {
              formik.handleSubmit();
            }}
            sx={{
              marginRight: '20px',
            }}
          />
          <Button onClick={onClose}>
            취소
          </Button>
        </Box>
      }
    />
  );
}
