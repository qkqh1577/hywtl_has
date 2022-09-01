import React from 'react';
import SectionLayout from 'layouts/SectionLayout';
import {
  Box,
  Grid
} from '@mui/material';
import Button from 'layouts/Button';
import TextField from 'components/TextField';

interface Props {

}

export default function ProjectBasicBusinessSection(props: Props) {

  return (
    <SectionLayout
      title="관계사"
      titleRightComponent={
        <Button shape="basic1">
          + 등록
        </Button>
      }>
      <Box sx={{
        display:  'flex',
        width:    '100%',
        flexWrap: 'nowrap',
        padding:  '15px 20px'
      }}>
        <Grid container spacing={2}>
          <Grid item sm={3}>목록</Grid>
          <Grid item sm={4}>업체명</Grid>
          <Grid item sm={1}>소속</Grid>
          <Grid item sm={1}>이름</Grid>
          <Grid item sm={1}>직위</Grid>
          <Grid item sm={2}>핸드폰번호</Grid>

          <Grid item sm={3}>견적 의뢰처</Grid>
          <Grid item sm={4}>
            <TextField
              name="business.0.name"
              label="업체명"
              labelProps={{
                disableLabel: true,
              }}
            />
          </Grid>
          <Grid item sm={1}>
            <TextField
              name="business.0.department"
              label="소속"
              labelProps={{
                disableLabel: true,
              }}
            />
          </Grid>
          <Grid item sm={1}>
            <TextField
              name="business.0.managerName"
              label="이름"
              labelProps={{
                disableLabel: true,
              }}
            />
          </Grid>
          <Grid item sm={1}>
            <TextField
              name="business.0.jobPosition"
              label="직위"
              labelProps={{
                disableLabel: true,
              }}
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              name="business.0.mobilePhone"
              label="핸드폰번호"
              labelProps={{
                disableLabel: true,
              }}
            />
          </Grid>

        </Grid>
      </Box>
    </SectionLayout>
  );
}