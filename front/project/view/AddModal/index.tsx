import React from 'react';
import ModalLayout, { ModalLayoutProps } from 'layouts/ModalLayout';
import {
  Box,
  Button,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import UserSelector from 'components/UserSelector';
import SelectField from 'components/SelectField';
import {
  ProjectProgressStatus,
  projectProgressStatusName
} from 'project/domain';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { ProjectAddParameter } from 'project/parameter';
import { FormikProvider } from 'formik';
import { FormikPartial } from 'type/Form';

export interface AddModalProps
  extends Omit<ModalLayoutProps, | 'children' | 'title' | 'width'>,
          FormikLayoutProps<FormikPartial<ProjectAddParameter>> {
}

export default function ProjectAddModal({
                                          open,
                                          onClose,
                                          formik
                                        }: AddModalProps) {

  return (
    <ModalLayout
      open={open}
      title="신규 프로젝트 등록"
      onClose={onClose}
      width="45vw"
    >
      <FormikProvider value={formik}>
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
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <TextField
                  required
                  name="name"
                  label="프로젝트 풀네임"
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  required
                  name="프로젝트 닉네임"
                  label="alias"
                />
              </Grid>
              <Grid item sm={6}>
                <UserSelector
                  required
                  name="receptionManager"
                  label="문의 접수자"
                />
              </Grid>
              <Grid item sm={6}>
                <SelectField
                  required
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
            </Grid>
          </Box>
          <Box sx={{
            display: 'flex',
            width:   '40%',
            height:  'calc(100% - 40px)',
            border:  '1px solid #0000001f',
          }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                견적 의뢰처 TBD
              </Grid>
              <Grid item sm={12}>
                소개자 TBD
              </Grid>
              <Grid item sm={12}>
                총 동 수 TBD
              </Grid>
              <Grid item sm={12}>
                단지 수 TBD
              </Grid>
              <Grid item sm={12}>
                예상 시작 시점 TBD
              </Grid>
              <Grid item sm={12}>
                현재 인허가 단계 TBD
              </Grid>
              <Grid item sm={12}>
                관계사 정보 TBD
              </Grid>
              <Grid item sm={12}>
                견적 발송처 TBD
              </Grid>
              <Grid item sm={12}>
                기타 메모사항 TBD
              </Grid>
            </Grid>
          </Box>
          <Box sx={{
            display:        'flex',
            width:          '100%',
            height:         '30px',
            justifyContent: 'center'
          }}>
            <Button>
              등록
            </Button>
            <Button onClick={onClose}>
              취소
            </Button>
          </Box>
        </Box>
      </FormikProvider>
    </ModalLayout>
  );
}