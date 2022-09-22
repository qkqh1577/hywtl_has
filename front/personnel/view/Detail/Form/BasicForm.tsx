import React from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import UploadField from 'components/UploadField';
import DateField from 'components/DateField';

export default function BasicForm({ basic, edit }) {
  return (
    <Box sx={{
      margin:  '10px 0px',
      padding: '10px',
    }}>
      <Grid container>
        <Grid item sm={2}>
          <Grid item sm={12}>기본 정보</Grid>
        </Grid>
        <Grid item sm={10}>
          <Grid container item sm={12}>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={6}>
                <Grid item sm={12}>
                  <TextField
                    name="basic.engName"
                    label="영문명"
                  />
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Grid item sm={12}>
                  <DateField
                    name="basic.birthDate"
                    label="생년월일"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={6}>
                <TextField
                  name="basic.sex"
                  label="성별"
                />
              </Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={6}>
                <Grid item sm={12}>
                  <TextField
                    name="basic.phone"
                    label="핸드폰"
                  />
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Grid item sm={12}>
                  <TextField
                    name="basic.personalEmail"
                    label="개인 이메일"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item sm={12} spacing={2}>
              <Grid item sm={6}>
                <Grid item sm={12}>
                  <TextField
                    name="basic.emergencyPhone"
                    label="비상연락처"
                  />
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <Grid item sm={12}>
                  <TextField
                    name="basic.relationship"
                    label="비상연락처 사원과의 관계"
                    labelWidth={11 * 13}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <TextField
                name="basic.address"
                label="거주지 주소"
              />
            </Grid>
            <Grid item sm={12}>
              <UploadField
                preview
                name="basic.image"
                label="프로필 사진"
                accept="image/*"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
