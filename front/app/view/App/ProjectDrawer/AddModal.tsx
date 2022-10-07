import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import {
  Box,
  Button,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import UserSelector from 'components/UserSelector';
import SelectField from 'components/SelectField';
import { ColorPalette } from 'app/view/App/theme';
import { memoLabelList } from 'app/route/projectAddModal';
import {
  projectBasicBidTypeList,
  projectBasicBidTypeName,
  ProjectProgressStatus,
  projectProgressStatusName
} from 'project_status/domain';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';

export interface AddModalProps {
  open: boolean;
  onClose: DefaultFunction;
}


export default function ProjectAddModal({ open, onClose }: AddModalProps) {
  const formik = useContext(FormikContext);

  const onSubmit = () => {
    formik.handleSubmit();
  };

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
                <TextField
                  required
                  labelPosition="top"
                  name="name"
                  label="프로젝트 풀네임"
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  required
                  labelPosition="top"
                  name="alias"
                  label="프로젝트 닉네임"
                />
              </Grid>
              <Grid item sm={6}>
                <UserSelector
                  required
                  labelPosition="top"
                  name="receptionManagerId"
                  label="문의 접수자"
                />
              </Grid>
              <Grid item sm={6}>
                <SelectField
                  required
                  labelPosition="top"
                  name="progressStatus"
                  label="진행 현황"
                  options={[{
                    key:  ProjectProgressStatus.TEMPORARY as string,
                    text: projectProgressStatusName(ProjectProgressStatus.TEMPORARY),
                  }, {
                    key:  ProjectProgressStatus.UNDER_CONTRACT as string,
                    text: projectProgressStatusName(ProjectProgressStatus.UNDER_CONTRACT)
                  }]}
                />
              </Grid>
              <Grid item sm={6}>
                <SelectField
                  required
                  labelPosition="top"
                  name="bidType"
                  label="견적 구분"
                  options={projectBasicBidTypeList.map((item) => ({
                    key:  item as string,
                    text: projectBasicBidTypeName(item),
                  }))}
                />
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
                  <TextField
                    labelPosition="top"
                    name={`memo_${i}`}
                    label={label}
                  />
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
        <>
          <Button
            children="등록"
            onClick={onSubmit}
            sx={{
              marginRight: '20px',
            }}
          />
          <Button onClick={onClose}>
            취소
          </Button>
        </>
      }
    />
  );
}
